import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface TicTacToeProps extends WindowAppProps { }

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC<TicTacToeProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Player>(null);
    const [draw, setDraw] = useState(false);

    const checkWinner = (squares: Player[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i: number) => {
        if (winner || board[i]) return;

        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
        } else if (!newBoard.includes(null)) {
            setDraw(true);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setDraw(false);
    };

    const getStatus = () => {
        if (winner) return `Winner: ${winner}`;
        if (draw) return "It's a Draw!";
        return `Next Player: ${isXNext ? 'X' : 'O'}`;
    };

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Tic Tac Toe"
            windowBarIcon="windowGameIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={getStatus()}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: '#c0c0c0',
                padding: 10,
                boxSizing: 'border-box'
            }}>
                {/* Game Board Container */}
                <div style={{
                    border: '3px outset white',
                    padding: 6,
                    backgroundColor: '#c0c0c0',
                    display: 'inline-block'
                }}>
                    {/* Status Bar */}
                    <div style={{
                        marginBottom: 10,
                        padding: '4px 8px',
                        border: '2px inset white',
                        backgroundColor: '#c0c0c0',
                        fontFamily: 'MSSerif',
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {getStatus()}
                    </div>

                    {/* Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 4,
                        backgroundColor: '#c0c0c0'
                    }}>
                        {board.map((square, i) => (
                            <button
                                key={i}
                                onClick={() => handleClick(i)}
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#c0c0c0',
                                    border: square ? '2px inset white' : '2px outset white',
                                    fontSize: 32,
                                    fontWeight: 'bold',
                                    fontFamily: 'Arial',
                                    color: square === 'X' ? 'blue' : 'red',
                                    cursor: winner || square ? 'default' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {square}
                            </button>
                        ))}
                    </div>

                    {/* Reset Button */}
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                        <button
                            onClick={resetGame}
                            style={{
                                padding: '4px 16px',
                                fontFamily: 'MSSerif',
                                fontSize: 14,
                                backgroundColor: '#c0c0c0',
                                border: '2px outset white',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default TicTacToe;
