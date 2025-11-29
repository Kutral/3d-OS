import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface BrowserProps extends WindowAppProps { }

interface SearchResult {
    title: string;
    snippet: string;
    pageid: number;
}

const Browser: React.FC<BrowserProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 50 });
    const [url, setUrl] = useState('http://www.google.com');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentView, setCurrentView] = useState<'home' | 'results'>('home');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    // Popup State
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            setCurrentView('results');
            setUrl(`http://www.google.com/search?q=${encodeURIComponent(searchTerm)}`);
            setLoading(true);

            try {
                // Fetch real results from Wikipedia API
                const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`);
                const data = await response.json();
                if (data.query && data.query.search) {
                    setResults(data.query.search);
                }
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const goHome = () => {
        setCurrentView('home');
        setSearchTerm('');
        setUrl('http://www.google.com');
        setResults([]);
    };

    const handleLinkClick = (e: React.MouseEvent, linkUrl: string) => {
        e.preventDefault();
        setPendingUrl(linkUrl);
    };

    const confirmNavigation = () => {
        if (pendingUrl) {
            window.open(pendingUrl, '_blank');
            setPendingUrl(null);
        }
    };

    const cancelNavigation = () => {
        setPendingUrl(null);
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
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#c0c0c0', position: 'relative' }}>
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
                    boxSizing: 'border-box',
                    position: 'relative'
                }}>
                    {currentView === 'home' ? (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100%'
                        }}>
                            {/* Retro Google Logo */}
                            <div style={{
                                fontSize: 60,
                                fontFamily: 'Times New Roman',
                                marginBottom: 20,
                                textShadow: '2px 2px 1px #ccc',
                                letterSpacing: -2
                            }}>
                                <span style={{ color: '#3369E8' }}>G</span>
                                <span style={{ color: '#D50F25' }}>o</span>
                                <span style={{ color: '#EEB211' }}>o</span>
                                <span style={{ color: '#3369E8' }}>g</span>
                                <span style={{ color: '#009925' }}>l</span>
                                <span style={{ color: '#D50F25' }}>e</span>
                                <span style={{ fontSize: 14, color: '#666', marginLeft: 4 }}>!</span>
                            </div>

                            <div style={{
                                backgroundColor: '#eee',
                                padding: 20,
                                width: '80%',
                                maxWidth: 400,
                                textAlign: 'center',
                                border: '1px solid #ccc',
                                marginBottom: 20,
                                boxShadow: '2px 2px 0px rgba(0,0,0,0.1)'
                            }}>
                                <p style={{ margin: '0 0 10px 0', fontSize: 12, fontFamily: 'Arial' }}>Search the web using Google!</p>
                                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: '90%', marginBottom: 10, padding: 4, border: '1px solid #999' }}
                                    />
                                    <div>
                                        <button type="submit" style={{ marginRight: 5, padding: '2px 8px', cursor: 'pointer', fontFamily: 'Arial', fontSize: 11 }}>Google Search</button>
                                        <button type="button" style={{ padding: '2px 8px', cursor: 'pointer', fontFamily: 'Arial', fontSize: 11 }}>I'm feeling lucky</button>
                                    </div>
                                </form>
                            </div>

                            <div style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Arial', color: '#666' }}>
                                <p>Copyright ©1998 Google Inc.</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            padding: 20,
                            fontFamily: 'Arial',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}>
                            {/* Search Results Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 20,
                                borderBottom: '1px solid #ccc',
                                paddingBottom: 10,
                                width: '100%'
                            }}>
                                <div style={{
                                    fontSize: 24,
                                    fontFamily: 'Times New Roman',
                                    marginRight: 20,
                                    cursor: 'pointer',
                                    letterSpacing: -1
                                }} onClick={goHome}>
                                    <span style={{ color: '#3369E8' }}>G</span>
                                    <span style={{ color: '#D50F25' }}>o</span>
                                    <span style={{ color: '#EEB211' }}>o</span>
                                    <span style={{ color: '#3369E8' }}>g</span>
                                    <span style={{ color: '#009925' }}>l</span>
                                    <span style={{ color: '#D50F25' }}>e</span>
                                </div>
                                <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1 }}>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ flex: 1, maxWidth: 400, marginRight: 10, padding: 4 }}
                                    />
                                    <button type="submit" style={{ padding: '2px 10px', cursor: 'pointer' }}>Search</button>
                                </form>
                            </div>

                            {/* Results */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ fontSize: 12, color: '#666', backgroundColor: '#eee', padding: 4 }}>
                                    {loading ? 'Searching...' : `Showing results for ${searchTerm}`}
                                </div>

                                {!loading && results.map((result) => (
                                    <div key={result.pageid} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <a
                                            href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                                            onClick={(e) => handleLinkClick(e, `https://en.wikipedia.org/?curid=${result.pageid}`)}
                                            style={{ color: '#0000cc', fontSize: 16, textDecoration: 'underline', marginBottom: 2, cursor: 'pointer' }}
                                        >
                                            {result.title}
                                        </a>
                                        <div style={{ color: '#008000', fontSize: 12, marginBottom: 2 }}>
                                            www.wikipedia.org/wiki/{result.title.replace(/\s+/g, '_')}
                                        </div>
                                        <div
                                            style={{ color: '#000', fontSize: 12 }}
                                            dangerouslySetInnerHTML={{ __html: result.snippet + '...' }}
                                        />
                                    </div>
                                ))}

                                {!loading && results.length === 0 && (
                                    <div style={{ color: '#666' }}>No results found. Try searching for something else.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirmation Popup */}
                {pendingUrl && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}>
                        <div style={{
                            width: 300,
                            backgroundColor: '#c0c0c0',
                            border: '2px outset white',
                            padding: 2,
                            boxShadow: '4px 4px 10px rgba(0,0,0,0.5)'
                        }}>
                            {/* Title Bar */}
                            <div style={{
                                backgroundColor: '#000080',
                                color: 'white',
                                padding: '2px 4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontFamily: 'MSSerif',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}>
                                <span>Security Alert</span>
                                <button
                                    onClick={cancelNavigation}
                                    style={{
                                        backgroundColor: '#c0c0c0',
                                        border: '1px outset white',
                                        width: 16,
                                        height: 16,
                                        fontSize: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                >X</button>
                            </div>

                            {/* Content */}
                            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <div style={{ fontSize: 32 }}>⚠️</div>
                                    <p style={{ margin: 0, fontFamily: 'MSSerif', fontSize: 14 }}>
                                        You are about to leave KutralOS and enter the outer world.
                                        <br /><br />
                                        Are you sure you want to continue?
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                                    <button
                                        onClick={confirmNavigation}
                                        style={{
                                            width: 70,
                                            padding: '4px 0',
                                            fontFamily: 'MSSerif',
                                            fontSize: 12,
                                            border: '2px outset white',
                                            backgroundColor: '#c0c0c0',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={cancelNavigation}
                                        style={{
                                            width: 70,
                                            padding: '4px 0',
                                            fontFamily: 'MSSerif',
                                            fontSize: 12,
                                            border: '2px outset white',
                                            backgroundColor: '#c0c0c0',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            outline: '1px dotted black',
                                            outlineOffset: -4
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Window>
    );
};

export default Browser;
