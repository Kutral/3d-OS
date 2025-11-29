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
            windowTitle="Snake Game"
            windowBarIcon="windowGameIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`Score: ${score} | High Score: ${highScore}`}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#2C3E50',
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
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2,
                            backgroundColor: i === 0 ? '#2ECC71' : '#27AE60',
                            borderRadius: 4,
                        }}
                    />
                ))}

                {/* Food */}
                <div
                    style={{
                        position: 'absolute',
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                        width: CELL_SIZE - 2,
                        height: CELL_SIZE - 2,
                        backgroundColor: '#E74C3C',
                        borderRadius: '50%',
                    }}
                />

                {/* Game Over / Pause Overlay */}
                {(gameOver || isPaused) && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 20,
                        borderRadius: 10,
                        textAlign: 'center',
                        color: 'white',
                    }}>
                        <h2>{gameOver ? 'Game Over!' : 'Paused'}</h2>
                        <p>Score: {score}</p>
                        {gameOver && (
                            <button
                                onClick={resetGame}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    backgroundColor: '#2ECC71',
                                    border: 'none',
                                    color: 'white',
                                    borderRadius: 5,
                                    marginTop: 10
                                }}
                            >
                                Play Again
                            </button>
                        )}
                        {!gameOver && <p>Press Space to Resume</p>}
                    </div>
                )}

                {/* Controls Info */}
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                }}>
                    Use Arrow Keys to Move • Space to Pause
                </div>
            </div>
        </Window>
    );
};

export default Snake;
