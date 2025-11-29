import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface BrowserProps extends WindowAppProps { }

const Browser: React.FC<BrowserProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 50 });
    const [url, setUrl] = useState('http://www.google.com');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            window.open(`https://www.google.com/search?q=${searchTerm}`, '_blank');
        }
    };

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Internet Explorer 4.0"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Done"
        >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#c0c0c0' }}>
                {/* Toolbar */}
                <div style={{ borderBottom: '2px solid #808080', padding: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontFamily: 'MSSerif', fontSize: 14 }}>Address:</span>
                    <input
                        type="text"
                        value={url}
                        readOnly
                        style={{
                            flex: 1,
                            border: '2px inset white',
                            padding: '2px 4px',
                            fontFamily: 'MSSerif'
                        }}
                    />
                </div>

                {/* Content */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '2px inset white',
                    margin: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 40,
                    overflow: 'auto'
                }}>
                    {/* Google Logo */}
                    <div style={{ fontSize: 60, fontFamily: 'Times New Roman', marginBottom: 20 }}>
                        <span style={{ color: '#4285f4' }}>G</span>
                        <span style={{ color: '#ea4335' }}>o</span>
                        <span style={{ color: '#fbbc05' }}>o</span>
                        <span style={{ color: '#4285f4' }}>g</span>
                        <span style={{ color: '#34a853' }}>l</span>
                        <span style={{ color: '#ea4335' }}>e</span>
                        <span style={{ fontSize: 14, color: '#666', marginLeft: 4 }}>!</span>
                    </div>

                    <div style={{
                        backgroundColor: '#eee',
                        padding: 10,
                        width: '80%',
                        maxWidth: 400,
                        textAlign: 'center',
                        border: '1px solid #ccc',
                        marginBottom: 20
                    }}>
                        <p style={{ margin: 0, fontSize: 12, fontFamily: 'Arial' }}>Search the web using Google!</p>
                        <form onSubmit={handleSearch} style={{ marginTop: 10 }}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '80%', marginBottom: 10 }}
                            />
                            <br />
                            <button type="submit" style={{ marginRight: 5 }}>Google Search</button>
                            <button type="button">I'm feeling lucky</button>
                        </form>
                    </div>

                    <div style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Arial', color: '#666' }}>
                        <p>Copyright ©1998 Google Inc.</p>
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Browser;
