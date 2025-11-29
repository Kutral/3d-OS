import React, { useState, useRef, useEffect } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface FileManagerProps extends WindowAppProps { }

type FileType = 'folder' | 'file';

interface FileSystemItem {
    name: string;
    type: FileType;
    children?: FileSystemItem[];
    content?: string; // For files, could be URL
    icon?: string;
}

const fileSystem: FileSystemItem[] = [
    {
        name: 'C:',
        type: 'folder',
        children: [
            {
                name: 'Music',
                type: 'folder',
                children: [
                    {
                        name: 'Bus Fight x Powerhouse x Disco.mp3',
                        type: 'file',
                        content: process.env.PUBLIC_URL + '/music/Bus Fight x Powerhouse x Disco.mp3',
                        icon: 'audio'
                    }
                ]
            },
            {
                name: 'Documents',
                type: 'folder',
                children: []
            },
            {
                name: 'Program Files',
                type: 'folder',
                children: []
            }
        ]
    }
];

const FileManager: React.FC<FileManagerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 80 });
    const [currentPath, setCurrentPath] = useState<FileSystemItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<FileSystemItem | null>(null);
    const [playingFile, setPlayingFile] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Initialize to C:
    useEffect(() => {
        if (currentPath.length === 0) {
            setCurrentPath([fileSystem[0]]);
        }
    }, [currentPath]);

    const getCurrentFolder = () => {
        if (currentPath.length === 0) return null;
        return currentPath[currentPath.length - 1];
    };

    const handleNavigate = (folder: FileSystemItem) => {
        setCurrentPath([...currentPath, folder]);
        setSelectedItem(null);
    };

    const handleUp = () => {
        if (currentPath.length > 1) {
            setCurrentPath(currentPath.slice(0, -1));
            setSelectedItem(null);
        }
    };

    const handleItemClick = (item: FileSystemItem) => {
        setSelectedItem(item);
    };

    const handleItemDoubleClick = (item: FileSystemItem) => {
        if (item.type === 'folder') {
            handleNavigate(item);
        } else if (item.type === 'file' && item.content) {
            // Play audio
            if (playingFile === item.content) {
                // Toggle pause?
                if (audioRef.current?.paused) {
                    audioRef.current.play();
                } else {
                    audioRef.current?.pause();
                }
            } else {
                setPlayingFile(item.content);
            }
        }
    };

    useEffect(() => {
        if (playingFile && audioRef.current) {
            audioRef.current.src = playingFile;
            audioRef.current.play().catch(e => console.error("Playback failed", e));
        }
    }, [playingFile]);

    const currentFolder = getCurrentFolder();

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="My Computer"
            windowBarIcon="myComputer"
            closeWindow={() => {
                if (audioRef.current) audioRef.current.pause();
                props.onClose();
            }}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={selectedItem ? `${selectedItem.name}` : `${currentFolder?.children?.length || 0} object(s)`}
        >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#c0c0c0' }}>
                {/* Toolbar */}
                <div style={{ borderBottom: '2px solid #808080', padding: 4, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <button onClick={handleUp} disabled={currentPath.length <= 1} style={{ minWidth: 60, padding: '2px 8px' }}>Up</button>
                    <div style={{
                        flex: 1,
                        backgroundColor: 'white',
                        border: '2px inset white',
                        padding: '2px 4px',
                        fontFamily: 'MSSerif',
                        fontSize: 12
                    }}>
                        {currentPath.map(p => p.name).join('\\')}
                    </div>
                </div>

                {/* Main Content */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '2px inset white',
                    margin: 2,
                    padding: 10,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                    gap: 20,
                    overflow: 'auto'
                }}>
                    {currentFolder?.children?.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => handleItemClick(item)}
                            onDoubleClick={() => handleItemDoubleClick(item)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: 80,
                                cursor: 'pointer',
                                padding: 4,
                                border: selectedItem === item ? '1px dotted black' : '1px solid transparent',
                                backgroundColor: selectedItem === item ? '#000080' : 'transparent',
                                color: selectedItem === item ? 'white' : 'black'
                            }}
                        >
                            {/* Icon Placeholder */}
                            <div style={{
                                width: 32,
                                height: 32,
                                marginBottom: 4,
                                backgroundColor: item.type === 'folder' ? '#ffd700' : '#fff',
                                border: '1px solid #000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 20
                            }}>
                                {item.type === 'folder' ? '📁' : '🎵'}
                            </div>
                            <span style={{
                                textAlign: 'center',
                                fontFamily: 'MSSerif',
                                fontSize: 12,
                                wordBreak: 'break-word'
                            }}>
                                {item.name}
                            </span>
                        </div>
                    ))}

                    {(!currentFolder?.children || currentFolder.children.length === 0) && (
                        <div style={{ padding: 20, color: '#666', fontFamily: 'MSSerif' }}>
                            (Empty)
                        </div>
                    )}
                </div>

                {/* Audio Player Control (Hidden or Visible) */}
                {playingFile && (
                    <div style={{ padding: 4, borderTop: '2px solid #808080', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <audio ref={audioRef} controls style={{ height: 30, width: '100%' }} />
                    </div>
                )}
            </div>
        </Window>
    );
};

export default FileManager;
