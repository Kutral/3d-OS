import React from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps { }

const About: React.FC<AboutProps> = (props) => {
    return (
        // add on resize listener
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm Kutraleeswaran B</h3>
            <br />
            <div className="text-block">
                <p>
                    I'm a Computer Science & Engineering Graduate currently working as an
                    Incubation Intern at Zoho School for Graduate Studies! In 2024 I graduated
                    from Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology,
                    Chennai with my B.Tech in Computer Science and Engineering with a CGPA of 8.18.
                </p>
                <br />
                <p>
                    Thank you for taking the time to check out my portfolio. I
                    really hope you enjoy exploring it as much as I enjoyed
                    building it. If you have any questions or comments, feel
                    free to contact me using{' '}
                    <Link to="/contact">this form</Link> or shoot me an email at{' '}
                    <a href="mailto:kutraleeswaran2003@gmail.com">
                        kutraleeswaran2003@gmail.com
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <p>
                    I'm a Computer Science & Engineering graduate with skills in web development,
                    API integration, and software testing. I'm eager to contribute to innovative
                    web development internships. Proficient in Java, Python, and MySQL, I aim to
                    build user-friendly web solutions while growing as a full-stack developer in
                    collaborative environments.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={me} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Figure 1:</b> Developing amazing web applications
                        </sub>
                    </p>
                </div>

                <p>
                    Currently, I am attending Zoho School for Graduate Studies, focusing on Java
                    programming, problem-solving, and system design using real-world projects. I'm
                    undergoing intensive hands-on training in core Java, object-oriented principles,
                    and debugging techniques aligned with industry standards.
                </p>
                <br />
                <p>
                    During my academic journey, I worked on several projects including a modern portfolio
                    website with 3D visuals using React Three Fiber and Framer Motion, an Automated Testing
                    Framework for Vehicle Control Systems using Python and Selenium, and an Online Voting
                    System with React and Node.js. You can learn more about these on my{' '}
                    <Link to="/projects/software">Software Projects</Link> page.
                </p>
                <br />
                <br />
                <div style={{}}>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'justify',
                            alignSelf: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <h3>My Skills & Certifications</h3>
                        <br />
                        <p>
                            My technical skill set includes front-end development with HTML, CSS,
                            JavaScript, and React. On the back-end, I work with Java, Python, and
                            various APIs. For databases, I'm proficient in MySQL and MongoDB.
                            I also have experience in software testing using Pytest, Selenium,
                            and Unit Testing frameworks.
                        </p>
                        <br />
                        <p>
                            I hold several certifications including PCAP: Programming Essentials in
                            Python from Cisco, Fundamentals of Deep Learning from NVIDIA, CCNA v7:
                            Introduction to Networks from Cisco, Introduction to Generative AI from
                            AWS Educate, Cybersecurity Essentials from Cisco, and MePro level 7.
                        </p>
                    </div>
                    <div style={styles.verticalImage}>
                        <img src={meNow} style={styles.image} alt="" />
                        <p>
                            <sub>
                                <b>Figure 2:</b> Current photo
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    Thanks for reading about me! I hope that you enjoy exploring
                    the rest of my portfolio website and everything it has to
                    offer. If you have any questions, feel free to reach out
                    via my GitHub{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://github.com/kutral"
                    >
                        @kutral
                    </a>{' '}
                    or LinkedIn{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://linkedin.com/in/kutraleeswaranb"
                    >
                        @kutraleeswaranb
                    </a>
                    . Good luck and have fun!
                </p>
                <br />
                <p>
                    If you have any questions or comments I would love to hear
                    them. You can reach me through the{' '}
                    <Link to="/contact">contact page</Link> or shoot me an email
                    at{' '}
                    <a href="mailto:kutraleeswaran2003@gmail.com">
                        kutraleeswaran2003@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        // width: '80%',
        marginLeft: 32,
        flex: 0.8,

        alignItems: 'center',
        // marginBottom: 32,
        textAlign: 'center',
        flexDirection: 'column',
    },
};

export default About;
