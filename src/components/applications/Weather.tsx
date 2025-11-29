import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface WeatherProps extends WindowAppProps { }

const apiKey = "e3b44bd86ba7a7d40c31f46e875eed8b";
const apiURl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const Weather: React.FC<WeatherProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city) return;

        setLoading(true);
        setError('');
        setWeatherData(null);

        try {
            const response = await fetch(apiURl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Weather"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Ready"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#c0c0c0',
                padding: 10,
                boxSizing: 'border-box',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    border: '2px outset white',
                    padding: 20,
                    backgroundColor: '#c0c0c0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 15,
                    width: '100%',
                    maxWidth: 400
                }}>
                    <h2 style={{ fontFamily: 'MSSerif', margin: 0, fontSize: 24 }}>Weather Forecast</h2>

                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, width: '100%' }}>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city name..."
                            style={{
                                flex: 1,
                                padding: 4,
                                fontFamily: 'MSSerif',
                                border: '2px inset white'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '4px 12px',
                                fontFamily: 'MSSerif',
                                cursor: 'pointer',
                                border: '2px outset white',
                                backgroundColor: '#c0c0c0',
                                fontWeight: 'bold'
                            }}
                        >
                            Search
                        </button>
                    </form>

                    <div style={{
                        width: '100%',
                        minHeight: 150,
                        border: '2px inset white',
                        backgroundColor: 'white',
                        padding: 15,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'MSSerif'
                    }}>
                        {loading && <div>Checking satellite...</div>}

                        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

                        {!loading && !error && !weatherData && (
                            <div style={{ color: '#666' }}>Enter a city to see the weather.</div>
                        )}

                        {weatherData && (
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: 20 }}>{weatherData.name}, {weatherData.sys.country}</h3>
                                <div style={{ fontSize: 48, fontWeight: 'bold', margin: '10px 0' }}>
                                    {Math.round(weatherData.main.temp)}°C
                                </div>
                                <div style={{ textTransform: 'capitalize', marginBottom: 10 }}>
                                    {weatherData.weather[0].description}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                    marginTop: 15,
                                    borderTop: '1px solid #ccc',
                                    paddingTop: 10
                                }}>
                                    <div>
                                        <div style={{ fontSize: 12, color: '#666' }}>Humidity</div>
                                        <div>{weatherData.main.humidity}%</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 12, color: '#666' }}>Wind</div>
                                        <div>{weatherData.wind.speed} m/s</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Weather;
