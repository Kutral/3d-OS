import React, { useEffect, useRef, useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface SnakeProps extends WindowAppProps { }

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

const Snake: React.FC<SnakeProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const gameLoopRef = useRef<NodeJS.Timeout>();

    const generateFood = (): Point => {
        return {
            x: Math.floor(Math.random() * (initWidth / CELL_SIZE)),
            y: Math.floor(Math.random() * ((initHeight - 60) / CELL_SIZE)),
        };
    };

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
                case ' ':
                    setIsPaused(prev => !prev);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameOver]);

    useEffect(() => {
        if (gameOver || isPaused) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = { ...prevSnake[0] };

                switch (direction) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                }

                // Check collision with walls
                if (
                    head.x < 0 ||
                    head.x >= Math.floor(initWidth / CELL_SIZE) ||
                    head.y < 0 ||
                    head.y >= Math.floor((initHeight - 60) / CELL_SIZE)
                ) {
                    setGameOver(true);
                    return prevSnake;
                }

                // Check collision with self
                if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [head, ...prevSnake];

                // Check collision with food
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => {
                        const newScore = s + 10;
                        if (newScore > highScore) setHighScore(newScore);
                        return newScore;
                    });
                    setFood(generateFood());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [direction, food, gameOver, isPaused, highScore, initWidth, initHeight]);

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Snake"
            windowBarIcon="windowGameIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`Score: ${score} | High Score: ${highScore}`}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#c0c0c0', // Windows 95 Gray
                padding: 4,
                boxSizing: 'border-box'
            }}>
                {/* Game Area Border */}
                <div style={{
                    position: 'relative',
                    flex: 1,
                    borderTop: '2px solid #808080',
                    borderLeft: '2px solid #808080',
                    borderRight: '2px solid #ffffff',
                    borderBottom: '2px solid #ffffff',
                    backgroundColor: 'black',
                    overflow: 'hidden'
                }}>
                    {/* Snake */}
                    {snake.map((segment, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: segment.x * CELL_SIZE,
                                top: segment.y * CELL_SIZE,
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                backgroundColor: '#00ff00', // Retro Green
                                border: '1px solid black',
                                boxSizing: 'border-box'
                            }}
                        />
                    ))}

                    {/* Food */}
                    <div
                        style={{
                            position: 'absolute',
                            left: food.x * CELL_SIZE,
                            top: food.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: 'red',
                            border: '1px solid black',
                            boxSizing: 'border-box'
                        }}
                    />

                    {/* Game Over / Pause Overlay */}
                    {(gameOver || isPaused) && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#c0c0c0',
                            border: '2px outset #ffffff',
                            padding: 20,
                            textAlign: 'center',
                            color: 'black',
                            boxShadow: '4px 4px 10px rgba(0,0,0,0.5)'
                        }}>
                            <h2 style={{ fontFamily: 'MSSerif', margin: '0 0 10px 0' }}>{gameOver ? 'Game Over' : 'Paused'}</h2>
                            <p style={{ fontFamily: 'MSSerif', margin: '0 0 10px 0' }}>Score: {score}</p>
                            {gameOver && (
                                <button
                                    onClick={resetGame}
                                    style={{
                                        padding: '4px 12px',
                                        fontFamily: 'MSSerif',
                                        cursor: 'pointer',
                                        backgroundColor: '#c0c0c0',
                                        border: '2px outset #ffffff',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Play Again
                                </button>
                            )}
                            {!gameOver && <p style={{ fontFamily: 'MSSerif', fontSize: 12 }}>Press Space to Resume</p>}
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div style={{
                    marginTop: 4,
                    padding: '2px 4px',
                    fontFamily: 'MSSerif',
                    fontSize: 12,
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>Use Arrow Keys</span>
                    <span>Space to Pause</span>
                </div>
            </div>
        </Window>
    );
};

export default Snake;
