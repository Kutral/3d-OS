import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from '../ResumeDownload';
// import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps { }

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below are some of the key projects I've worked on.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>kutraleeswaran.com</h2>
                <br />
                <p>
                    The portfolio website you are currently viewing! This project was built using
                    React, Three.js, and Framer Motion to create an immersive 3D experience.
                    It features a fully functional OS-style interface within a 3D environment.
                </p>
                <br />
                <div className="captioned-image">
                    {/* <VideoAsset src={saga} /> */}
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> A 3D portfolio website
                        </sub>
                    </p>
                </div>
                <p>
                    I wanted to create a unique way to showcase my work and skills. The site
                    demonstrates my ability to work with complex front-end technologies and
                    create engaging user experiences.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/kutral"
                        >
                            <p>
                                <b>[GitHub]</b> - Project Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Automated Testing Framework</h2>
                <br />
                <p>
                    An Automated Testing Framework for Vehicle Control Systems developed using
                    Python and Selenium. This framework automates the testing process for
                    critical vehicle control software, ensuring reliability and safety.
                </p>
                <br />
                <div className="captioned-image">
                    {/* <VideoAsset src={computer} /> */}
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 2:</b> Automated Testing Framework
                        </sub>
                    </p>
                </div>
                <p>
                    The framework includes comprehensive test suites for various control modules,
                    reporting features, and integration with CI/CD pipelines.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/kutral"
                        >
                            <p>
                                <b>[GitHub]</b> - Project Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Online Voting System</h2>
                <br />
                <p>
                    A secure and user-friendly Online Voting System built with React and Node.js.
                    This application allows users to cast votes securely and view real-time results.
                </p>
                <br />
                <div className="captioned-image">
                    {/* <VideoAsset src={scroll} /> */}
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 3:</b> Online Voting System
                        </sub>
                    </p>
                </div>
                <p>
                    Features include voter authentication, candidate management, and secure
                    vote tallying using cryptographic techniques.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/kutral"
                        >
                            <p>
                                <b>[GitHub]</b> - Project Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
