import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface BrowserProps extends WindowAppProps { }

const Browser: React.FC<BrowserProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 50 });
    const [url, setUrl] = useState('http://www.google.com');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentView, setCurrentView] = useState<'home' | 'results'>('home');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            setCurrentView('results');
            setUrl(`http://www.google.com/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const goHome = () => {
        setCurrentView('home');
        setSearchTerm('');
        setUrl('http://www.google.com');
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

                {/* Content Area */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '2px inset white',
                    margin: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {currentView === 'home' ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%'
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
                                padding: 20,
                                width: '80%',
                                maxWidth: 400,
                                textAlign: 'center',
                                border: '1px solid #ccc',
                                marginBottom: 20
                            }}>
                                <p style={{ margin: '0 0 10px 0', fontSize: 12, fontFamily: 'Arial' }}>Search the web using Google!</p>
                                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: '90%', marginBottom: 10, padding: 4 }}
                                    />
                                    <div>
                                        <button type="submit" style={{ marginRight: 5, padding: '2px 8px' }}>Google Search</button>
                                        <button type="button" style={{ padding: '2px 8px' }}>I'm feeling lucky</button>
                                    </div>
                                </form>
                            </div>

                            <div style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Arial', color: '#666' }}>
                                <p>Copyright ©1998 Google Inc.</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: 20, fontFamily: 'Arial' }}>
                            {/* Search Results Header */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
                                <div style={{ fontSize: 24, fontFamily: 'Times New Roman', marginRight: 10, cursor: 'pointer' }} onClick={goHome}>
                                    <span style={{ color: '#4285f4' }}>G</span>
                                    <span style={{ color: '#ea4335' }}>o</span>
                                    <span style={{ color: '#fbbc05' }}>o</span>
                                    <span style={{ color: '#4285f4' }}>g</span>
                                    <span style={{ color: '#34a853' }}>l</span>
                                    <span style={{ color: '#ea4335' }}>e</span>
                                </div>
                                <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1 }}>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ flex: 1, maxWidth: 300, marginRight: 5 }}
                                    />
                                    <button type="submit">Search</button>
                                </form>
                            </div>

                            {/* Mock Results */}
                            <div style={{ fontSize: 12 }}>
                                <p style={{ color: '#666' }}>Showing results for <b>{searchTerm}</b></p>

                                <div style={{ marginBottom: 15 }}>
                                    <a href="#" style={{ color: '#0000cc', fontSize: 14, textDecoration: 'underline' }}>{searchTerm} - Wikipedia, the free encyclopedia</a>
                                    <div style={{ color: '#008000' }}>www.wikipedia.org/wiki/{searchTerm}</div>
                                    <div style={{ color: '#000' }}>{searchTerm} is a very interesting topic that you are searching for...</div>
                                </div>

                                <div style={{ marginBottom: 15 }}>
                                    <a href="#" style={{ color: '#0000cc', fontSize: 14, textDecoration: 'underline' }}>The Official {searchTerm} Website</a>
                                    <div style={{ color: '#008000' }}>www.{searchTerm.replace(/\s+/g, '').toLowerCase()}.com/</div>
                                    <div style={{ color: '#000' }}>Welcome to the official website for {searchTerm}. Find all the latest news and updates.</div>
                                </div>

                                <div style={{ marginBottom: 15 }}>
                                    <a href="#" style={{ color: '#0000cc', fontSize: 14, textDecoration: 'underline' }}>Images for {searchTerm}</a>
                                    <div style={{ color: '#008000' }}>images.google.com/images?q={searchTerm}</div>
                                    <div style={{ color: '#000' }}>See more images for {searchTerm}.</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
};

export default Browser;
