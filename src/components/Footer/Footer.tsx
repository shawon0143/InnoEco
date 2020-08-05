import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <div className="footerContainer">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-6 col-md-3 footerColumn">
                        <ul className="list-unstyled">
                            <li>
                                <span>Future Students</span>
                            </li>
                            <li>
                                <span>Current Students</span>
                            </li>
                            <li>
                                <span>Alumni</span>
                            </li>
                            <li>
                                <span>Faculty &amp; Staff</span>
                            </li>
                            <li>
                                <span>Donors</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3 footerColumn">
                        <ul className="list-unstyled">
                            <li>
                                <span>News &amp; Media</span>
                            </li>
                            <li>
                                <span>Research &amp; Innovation</span>
                            </li>
                            <li>
                                <span>Academics</span>
                            </li>
                            <li>
                                <span>Programs of Study</span>
                            </li>
                            <li>
                                <span>University Life</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3 footerColumn">
                        <ul className="list-unstyled">
                            <li>
                                <span>Contacts</span>
                            </li>
                            <li>
                                <span>Careers</span>
                            </li>
                            <li>
                                <span>Accessibility</span>
                            </li>
                            <li>
                                <span>Privacy</span>
                            </li>
                            <li>
                                <span>Site Feedback</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3 footerColumn">
                        <ul className="list-unstyled">
                            <li>
                                <span>Koblenz Campus</span>
                            </li>
                            <li>
                                <span>Landau Campus</span>
                            </li>
                            <li>
                                <span>Mainz Campus</span>
                            </li>
                            <li>
                                <span>Campus Maps</span>
                            </li>
                            <li>
                                <span>Campus Safety</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-lg-center align-items-center text-center">
                    <div className="col-sm-6 col-md-4 col-lg-3 order-md-3 mb-4">
                        {/*<a className="u-link-v5 g-color-text g-color-primary--hover" href="#">*/}
                        <i className="align-center mr-2 icons icon-map" />
                        Koblenz, Germany
                        {/*</a>*/}
                    </div>

                    <div className="col-sm-6 col-md-4 col-lg-3 order-md-2 mb-4">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mx-2">
                                <div
                                    className="socialIcon rounded-circle"
                                >
                                    <i className="icons icon-social-twitter" />
                                </div>
                            </li>
                            <li className="list-inline-item mx-2">
                                <div
                                    className="socialIcon rounded-circle"
                                >
                                    <i className="icons icon-social-facebook" />
                                </div>
                            </li>
                            <li className="list-inline-item mx-2">
                                <div
                                    className="socialIcon rounded-circle"
                                >
                                    <i className="icons icon-social-instagram" />
                                </div>
                            </li>
                            <li className="list-inline-item mx-2">
                                <div
                                    className="socialIcon rounded-circle"
                                >
                                    <i className="icons icon-social-youtube" />
                                </div>
                            </li>
                            <li className="list-inline-item mx-2">
                                <div
                                    className="socialIcon rounded-circle"
                                >
                                    <i className="icons icon-social-linkedin" />
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-4 col-lg-3 order-md-1 mb-4">
                        <p className="g-color-text mb-0">
                            University of Koblenz - Since 1969
                        </p>
                    </div>
                </div>

                {/* ======= Temporary alert message ======= */}
                <div className="alert alert-warning text-center" role="alert">
                    This study project is under construction.
                </div>
            </div>
        </div>
    );
};

export default Footer;
