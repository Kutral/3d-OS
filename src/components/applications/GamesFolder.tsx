import React from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import Icon from '../general/Icon';
import { IconName } from '../../assets/icons';

export interface GamesFolderProps extends WindowAppProps {
    apps: {
        key: string;
        name: string;
        icon: IconName;
        onOpen: () => void;
    }[];
}

const GamesFolder: React.FC<GamesFolderProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    return (
        <Window
            top={50}
            left={50}
            width={initWidth}
            height={initHeight}
            windowTitle="Games"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`${props.apps.length} object(s)`}
        >
            <div style={{
                backgroundColor: 'white',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                gap: 20,
                padding: 20,
                boxSizing: 'border-box'
            }}>
                {props.apps.map(app => (
                    <div
                        key={app.key}
                        onDoubleClick={app.onOpen}
                        // Add hover effect logic if needed, or just simple pointer
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 80,
                            cursor: 'pointer'
                        }}
                    >
                        <Icon icon={app.icon} size={32} style={{ marginBottom: 4 }} />
                        <span style={{
                            textAlign: 'center',
                            fontFamily: 'MSSerif',
                            fontSize: 12,
                            userSelect: 'none'
                        }}>
                            {app.name}
                        </span>
                    </div>
                ))}
            </div>
        </Window>
    );
};

export default GamesFolder;
