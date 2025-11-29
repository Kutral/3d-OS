import React, { useEffect, useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface MinesweeperProps extends WindowAppProps { }

type CellState = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
};

const ROWS = 9;
const COLS = 9;
const MINES = 10;

const Minesweeper: React.FC<MinesweeperProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const [grid, setGrid] = useState<CellState[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [mineCount, setMineCount] = useState(MINES);
    const [timer, setTimer] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    // Initialize Game
    const initGame = () => {
        const newGrid: CellState[][] = [];
        for (let r = 0; r < ROWS; r++) {
            const row: CellState[] = [];
            for (let c = 0; c < COLS; c++) {
                row.push({
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0,
                });
            }
            newGrid.push(row);
        }

        // Place Mines
        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            if (!newGrid[r][c].isMine) {
                newGrid[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate Neighbors
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (newGrid[r][c].isMine) continue;
                let neighbors = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (r + i >= 0 && r + i < ROWS && c + j >= 0 && c + j < COLS) {
                            if (newGrid[r + i][c + j].isMine) neighbors++;
                        }
                    }
                }
                newGrid[r][c].neighborMines = neighbors;
            }
        }

        setGrid(newGrid);
        setGameOver(false);
        setWin(false);
        setMineCount(MINES);
        setTimer(0);
        setGameStarted(false);
    };

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStarted && !gameOver && !win) {
            interval = setInterval(() => {
                setTimer((t) => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameOver, win]);

    const revealCell = (r: number, c: number) => {
        if (gameOver || win || grid[r][c].isFlagged || grid[r][c].isRevealed) return;

        if (!gameStarted) setGameStarted(true);

        const newGrid = [...grid];

        if (newGrid[r][c].isMine) {
            // Game Over
            newGrid[r][c].isRevealed = true;
            setGameOver(true);
            // Reveal all mines
            newGrid.forEach(row => row.forEach(cell => {
                if (cell.isMine) cell.isRevealed = true;
            }));
        } else {
            // Flood fill if empty
            const reveal = (row: number, col: number) => {
                if (row < 0 || row >= ROWS || col < 0 || col >= COLS || newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;

                newGrid[row][col].isRevealed = true;

                if (newGrid[row][col].neighborMines === 0) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            reveal(row + i, col + j);
                        }
                    }
                }
            };
            reveal(r, c);
        }
        setGrid(newGrid);
        checkWin(newGrid);
    };

    const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (gameOver || win || grid[r][c].isRevealed) return;

        const newGrid = [...grid];
        newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
        setGrid(newGrid);
        setMineCount(prev => newGrid[r][c].isFlagged ? prev - 1 : prev + 1);
    };

    const checkWin = (currentGrid: CellState[][]) => {
        let unrevealedSafeCells = 0;
        currentGrid.forEach(row => row.forEach(cell => {
            if (!cell.isMine && !cell.isRevealed) unrevealedSafeCells++;
        }));
        if (unrevealedSafeCells === 0) {
            setWin(true);
            setGameOver(true);
        }
    };

    const getCellColor = (count: number) => {
        switch (count) {
            case 1: return 'blue';
            case 2: return 'green';
            case 3: return 'red';
            case 4: return 'darkblue';
            case 5: return 'brown';
            case 6: return 'teal';
            case 7: return 'black';
            case 8: return 'gray';
            default: return 'black';
        }
    };

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Minesweeper"
            windowBarIcon="windowGameIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={gameOver ? (win ? "You Won!" : "Game Over") : "Minesweeper"}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: '#c0c0c0',
                padding: 10
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: 300,
                    marginBottom: 10,
                    border: '2px inset white',
                    padding: 5,
                    backgroundColor: '#c0c0c0'
                }}>
                    <div style={{ background: 'black', color: 'red', fontFamily: 'monospace', fontSize: 24, padding: '0 5px' }}>
                        {mineCount.toString().padStart(3, '0')}
                    </div>
                    <button onClick={initGame} style={{ fontSize: 20, cursor: 'pointer' }}>
                        {gameOver ? (win ? '😎' : '😵') : '🙂'}
                    </button>
                    <div style={{ background: 'black', color: 'red', fontFamily: 'monospace', fontSize: 24, padding: '0 5px' }}>
                        {timer.toString().padStart(3, '0')}
                    </div>
                </div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${COLS}, 30px)`,
                    gap: 1,
                    border: '3px inset white',
                    backgroundColor: '#808080'
                }}>
                    {grid.map((row, r) => (
                        row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => revealCell(r, c)}
                                onContextMenu={(e) => toggleFlag(e, r, c)}
                                style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: cell.isRevealed ? '#c0c0c0' : '#c0c0c0',
                                    border: cell.isRevealed ? '1px solid #808080' : '3px outset white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'default',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: getCellColor(cell.neighborMines)
                                }}
                            >
                                {cell.isRevealed ? (
                                    cell.isMine ? '💣' : (cell.neighborMines > 0 ? cell.neighborMines : '')
                                ) : (
                                    cell.isFlagged ? '🚩' : ''
                                )}
                            </div>
                        ))
                    ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12 }}>Left Click: Reveal | Right Click: Flag</div>
            </div>
        </Window>
    );
};

export default Minesweeper;
