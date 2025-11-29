import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps { }

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Zoho School for Graduate Studies</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://www.zoho.com/zohouniversity/'}
                        >
                            <h4>zoho.com/zohouniversity</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Incubation Intern</h3>
                        <b>
                            <p>September 2025 – Present</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Currently attending Zoho School for Graduate Studies in Vellore,
                    focusing on Java programming, problem-solving, and system design
                    using real-world projects.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Undergoing intensive hands-on training in core Java,
                            object-oriented principles, and debugging techniques
                            aligned with industry standards.
                        </p>
                    </li>
                    <li>
                        <p>
                            Working on real-world projects to develop practical skills
                            in software development and system design.
                        </p>
                    </li>
                    <li>
                        <p>
                            Collaborating with peers on complex programming challenges
                            to enhance problem-solving abilities.
                        </p>
                    </li>
                    <li>
                        <p>
                            Learning industry best practices for code maintenance,
                            version control, and collaborative development.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Education</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Bachelor of Technology in Computer Science and Engineering</h3>
                        <b>
                            <p>2020 - 2024</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>CGPA:</b> 8.18
                        </p>
                    </li>
                    <li>
                        <p>
                            Developed strong foundation in computer science fundamentals,
                            data structures, algorithms, and software engineering principles.
                        </p>
                    </li>
                    <li>
                        <p>
                            Completed multiple projects in web development, testing automation,
                            and database management.
                        </p>
                    </li>
                    <li>
                        <p>
                            Gained hands-on experience with modern development frameworks
                            including React, Node.js, and various testing tools.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Certifications</h1>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <br />
                <ul>
                    <li style={styles.row}>
                        <p>• PCAP: Programming Essentials in Python</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.cisco.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Cisco
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• Fundamentals of Deep Learning</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.nvidia.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                NVIDIA
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• CCNA v7: Introduction to Networks</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.cisco.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Cisco
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• Introduction to Generative AI</p>
                        <p>
                            [{' '}
                            <a
                                href="https://aws.amazon.com/education/awseducate/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                AWS Educate
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• Cybersecurity Essentials</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.cisco.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Cisco
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• MePro level 7</p>
                        <p>[ Certification ]</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
