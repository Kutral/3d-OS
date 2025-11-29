import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface ShowcaseExplorerProps extends WindowAppProps { }

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const [currentPage, setCurrentPage] = useState('home');

    if (currentPage === 'home') {
        return (
            <Window
                top={24}
                left={56}
                width={initWidth}
                height={initHeight}
                windowTitle="Kutraleeswaran B - Showcase 2025"
                windowBarIcon="windowExplorerIcon"
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
                bottomLeftText={'© Copyright 2025 Kutraleeswaran B'}
            >
                <div className="site-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ textAlign: 'center', padding: 20, maxWidth: '100%' }}>
                        <h1 style={{ fontSize: 42, marginBottom: 16, lineHeight: 1.1 }}>Kutraleeswaran B</h1>
                        <h2 style={{ fontSize: 20, marginBottom: 32, fontWeight: 'normal' }}>Computer Science & Engineering Graduate</h2>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="site-button" onClick={() => setCurrentPage('about')}>ABOUT</button>
                            <button className="site-button" onClick={() => setCurrentPage('experience')}>EXPERIENCE</button>
                            <button className="site-button" onClick={() => setCurrentPage('projects')}>PROJECTS</button>
                            <button className="site-button" onClick={() => setCurrentPage('contact')}>CONTACT</button>
                        </div>
                    </div>
                </div>
            </Window>
        );
    }

    // Pages with sidebar
    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Kutraleeswaran B - Showcase 2025"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2025 Kutraleeswaran B'}
        >
            <div className="site-page" style={{ display: 'flex', height: '100%' }}>
                {/* Sidebar */}
                <div style={{
                    width: 300,
                    padding: 48,
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ marginBottom: 64 }}>
                        <h1 style={{ fontSize: 38, lineHeight: 1, margin: 0 }}>Kutraleeswaran</h1>
                        <h1 style={{ fontSize: 38, lineHeight: 1, margin: 0 }}>B</h1>
                        <h3 style={{ marginTop: 12 }}>Showcase '25</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <h4 onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer', textDecoration: 'underline', margin: 0, fontWeight: 'bold' }}>HOME</h4>
                        <h4 onClick={() => setCurrentPage('about')} style={{ cursor: 'pointer', textDecoration: 'underline', margin: 0, fontWeight: 'bold' }}>ABOUT</h4>
                        <h4 onClick={() => setCurrentPage('experience')} style={{ cursor: 'pointer', textDecoration: 'underline', margin: 0, fontWeight: 'bold' }}>EXPERIENCE</h4>
                        <h4 onClick={() => setCurrentPage('projects')} style={{ cursor: 'pointer', textDecoration: 'underline', margin: 0, fontWeight: 'bold' }}>PROJECTS</h4>
                        <h4 onClick={() => setCurrentPage('contact')} style={{ cursor: 'pointer', textDecoration: 'underline', margin: 0, fontWeight: 'bold' }}>CONTACT</h4>
                    </div>
                </div>

                {/* Content */}
                <div className="site-page-content" style={{ flex: 1, overflowY: 'auto' }}>
                    {currentPage === 'about' && (
                        <>
                            <h1 style={{ marginLeft: -16 }}>About Me</h1>
                            <div className="text-block">
                                <h3>Summary</h3>
                                <p>Computer Science & Engineering graduate with skills in web development, API integration, and software testing. Proficient in Java, Python, and MySQL, I aim to build user-friendly web solutions while growing as a full-stack developer.</p>
                                <br />
                                <h3>Education</h3>
                                <p><b>Bachelor of Technology in Computer Science and Engineering (2020-2024)</b></p>
                                <p>Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai</p>
                                <p><b>CGPA: 8.18</b></p>
                                <br />
                                <h3>Technical Skills</h3>
                                <p><b>Front-End:</b> HTML, CSS, JavaScript, React</p>
                                <p><b>Back-End:</b> Java, Python, APIs</p>
                                <p><b>Database:</b> MySQL, MongoDB</p>
                                <p><b>Testing:</b> Pytest, Selenium, Unit Testing</p>
                            </div>
                        </>
                    )}
                    {currentPage === 'experience' && (
                        <>
                            <h1 style={{ marginLeft: -16 }}>Experience</h1>
                            <div className="text-block">
                                <h2>Zoho School for Graduate Studies</h2>
                                <h3>Incubation Intern (September 2025 – Present)</h3>
                                <p><b>Location:</b> Vellore</p>
                                <ul>
                                    <li>Currently attending Zoho School for Graduate Studies, focusing on Java programming, problem-solving, and system design using real-world projects.</li>
                                    <li>Undergoing intensive hands-on training in core Java, object-oriented principles, and debugging techniques aligned with industry standards.</li>
                                </ul>
                                <br />
                                <h2>Certifications</h2>
                                <ul>
                                    <li><b>PCAP: Programming Essentials in Python</b> - Cisco</li>
                                    <li><b>Fundamentals of Deep Learning</b> - NVIDIA</li>
                                    <li><b>CCNA v7: Introduction to Networks</b> - Cisco</li>
                                    <li><b>Introduction to Generative AI</b> - AWS Educate</li>
                                    <li><b>Cybersecurity Essentials</b> - Cisco</li>
                                    <li><b>MePro level 7</b> - Pearson</li>
                                </ul>
                            </div>
                        </>
                    )}
                    {currentPage === 'projects' && (
                        <>
                            <h1 style={{ marginLeft: -16 }}>Projects</h1>
                            <div className="text-block">
                                <h2>Portfolio Website</h2>
                                <p>Developed a modern portfolio website with 3D visuals and smooth animations using React Three Fiber and Framer Motion. Designed a responsive UI with TailwindCSS and integrated contact form using EmailJS.</p>
                                <p><a href="https://kutral.github.io/Portfolio/" target="_blank" rel="noreferrer">View Live Site →</a></p>
                                <br />
                                <h2>Automated Testing Framework for Vehicle Control Systems</h2>
                                <p>A testing tool to check vehicle control system features using Python and Selenium. Wrote automated test scripts with Pytest to verify functionality, reducing manual testing time. Integrated APIs to test data inputs.</p>
                                <br />
                                <h2>Online Voting System</h2>
                                <p>A web application for online voting with user-friendly interface using React. Used Node.js and MySQL to handle user data and votes securely. Added API integration to update voting results in real-time.</p>
                            </div>
                        </>
                    )}
                    {currentPage === 'contact' && (
                        <>
                            <h1 style={{ marginLeft: -16 }}>Contact</h1>
                            <div className="text-block">
                                <p>I am currently an Incubation Intern at Zoho School for Graduate Studies. I am eager to contribute to innovative web development opportunities. Feel free to reach out!</p>
                                <br />
                                <h3>Contact Information</h3>
                                <p><b>Email:</b> <a href="mailto:kutraleeswaran2003@gmail.com">kutraleeswaran2003@gmail.com</a></p>
                                <p><b>Phone:</b> <a href="tel:+919597581629">+91-9597581629</a></p>
                                <br />
                                <h3>Connect Online</h3>
                                <p><a href="https://github.com/kutral" target="_blank" rel="noreferrer">GitHub - github.com/kutral</a></p>
                                <p><a href="https://linkedin.com/in/kutraleeswaranb/" target="_blank" rel="noreferrer">LinkedIn - linkedin.com/in/kutraleeswaranb/</a></p>
                                <p><a href="https://kutral.github.io/Portfolio/" target="_blank" rel="noreferrer">Portfolio - kutral.github.io/Portfolio/</a></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Window>
    );
};

export default ShowcaseExplorer;
