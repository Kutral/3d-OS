import React, { useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/colors';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import Doom from '../applications/Doom';
import OregonTrail from '../applications/OregonTrail';
import ShutdownSequence from './ShutdownSequence';
// import ThisComputer from '../applications/ThisComputer';
import Minesweeper from '../applications/Minesweeper';
import Browser from '../applications/Browser';
import TicTacToe from '../applications/TicTacToe';
import FileManager from '../applications/FileManager';
import Weather from '../applications/Weather';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import Snake from '../applications/Snake';
import { IconName } from '../../assets/icons';
import Credits from '../applications/Credits';
import GamesFolder from '../applications/GamesFolder';

export interface DesktopProps { }

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const APPLICATIONS: {
    [key in string]: {
        key: string;
        name: string;
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    // computer: {
    //     key: 'computer',
    //     name: 'This Computer',
    //     shortcutIcon: 'computerBig',
    //     component: ThisComputer,
    // },
    showcase: {
        key: 'showcase',
        name: 'My Showcase',
        shortcutIcon: 'myComputer',
        component: ShowcaseExplorer,
    },
    trail: {
        key: 'trail',
        name: 'The Oregon Trail',
        shortcutIcon: 'trailIcon',
        component: OregonTrail,
    },
    doom: {
        key: 'doom',
        name: 'Doom',
        shortcutIcon: 'doomIcon',
        component: Doom,
    },
    snake: {
        key: 'snake',
        name: 'Snake',
        shortcutIcon: 'windowGameIcon',
        component: Snake,
    },
    minesweeper: {
        key: 'minesweeper',
        name: 'Minesweeper',
        shortcutIcon: 'windowGameIcon',
        component: Minesweeper,
    },
    browser: {
        key: 'browser',
        name: 'Internet',
        shortcutIcon: 'windowExplorerIcon',
        component: Browser,
    },
    tictactoe: {
        key: 'tictactoe',
        name: 'Tic Tac Toe',
        shortcutIcon: 'windowGameIcon',
        component: TicTacToe,
    },
    computer: {
        key: 'computer',
        name: 'My Computer',
        shortcutIcon: 'computerBig',
        component: FileManager,
    },
    weather: {
        key: 'weather',
        name: 'Weather',
        shortcutIcon: 'windowExplorerIcon',
        component: Weather,
    },
    credits: {
        key: 'credits',
        name: 'Credits',
        shortcutIcon: 'credits',
        component: Credits,
    },
    games: {
        key: 'games',
        name: 'Games',
        shortcutIcon: 'windowGameIcon', // Using generic game icon for folder
        component: GamesFolder,
    },
};

const Desktop: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});

    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: 1 + getHighestZIndex(),
                },
            }));
        },
        [setWindows, getHighestZIndex]
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: getHighestZIndex() + 1,
                    minimized: false,
                    component: element,
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [getHighestZIndex]
    );

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];

            // Skip individual games
            if (['doom', 'trail', 'snake', 'minesweeper', 'tictactoe'].includes(key)) {
                return;
            }

            if (key === 'games') {
                newShortcuts.push({
                    shortcutName: app.name,
                    icon: app.shortcutIcon,
                    onOpen: () => {
                        const gameApps = ['doom', 'trail', 'snake', 'minesweeper', 'tictactoe'].map(gameKey => ({
                            key: gameKey,
                            name: APPLICATIONS[gameKey].name,
                            icon: APPLICATIONS[gameKey].shortcutIcon,
                            onOpen: () => {
                                addWindow(
                                    gameKey,
                                    <APPLICATIONS[gameKey].component
                                        onInteract = {() => onWindowInteract(gameKey)}
onMinimize = {() => minimizeWindow(gameKey)}
onClose = {() => removeWindow(gameKey)}
key = { gameKey }
    />
                                );
                            }
                        }));

addWindow(
    app.key,
    <GamesFolder
        onInteract={() => onWindowInteract(app.key)}
        onMinimize={() => minimizeWindow(app.key)}
        onClose={() => removeWindow(app.key)}
        apps={gameApps}
        key={app.key}
    />
);
                    },
                });
return;
            }

newShortcuts.push({
    shortcutName: app.name,
    icon: app.shortcutIcon,
    onOpen: () => {
        addWindow(
            app.key,
            <app.component
                onInteract={() => onWindowInteract(app.key)}
                onMinimize={() => minimizeWindow(app.key)}
                onClose={() => removeWindow(app.key)}
                key={app.key}
            />
        );
    },
});
        });

newShortcuts.forEach((shortcut) => {
    if (shortcut.shortcutName === 'My Showcase') {
        shortcut.onOpen();
    }
});

setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

return !shutdown ? (
    <div style={styles.desktop}>
        {/* For each window in windows, loop over and render  */}
        {Object.keys(windows).map((key) => {
            const element = windows[key].component;
            if (!element) return <div key={`win-${key}`}></div>;
            return (
                <div
                    key={`win-${key}`}
                    style={Object.assign(
                        {},
                        { zIndex: windows[key].zIndex },
                        windows[key].minimized && styles.minimized
                    )}
                >
                    {React.cloneElement(element, {
                        key,
                        onInteract: () => onWindowInteract(key),
                        onClose: () => removeWindow(key),
                    })}
                </div>
            );
        })}
        <div style={styles.shortcuts}>
            {shortcuts.map((shortcut, i) => {
                const ITEMS_PER_COL = 5;
                const col = Math.floor(i / ITEMS_PER_COL);
                const row = i % ITEMS_PER_COL;
                return (
                    <div
                        style={Object.assign({}, styles.shortcutContainer, {
                            top: row * 104,
                            left: col * 100,
                        })}
                        key={shortcut.shortcutName}
                    >
                        <DesktopShortcut
                            icon={shortcut.icon}
                            shortcutName={shortcut.shortcutName}
                            onOpen={shortcut.onOpen}
                        />
                    </div>
                );
            })}
        </div>
        <Toolbar
            windows={windows}
            toggleMinimize={toggleMinimize}
            shutdown={startShutdown}
        />
    </div>
) : (
    <ShutdownSequence
        setShutdown={setShutdown}
        numShutdowns={numShutdowns}
    />
);
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: Colors.turquoise,
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcutContainer: {
        position: 'absolute',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;
