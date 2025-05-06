import React from "react";
import teamOne from "../../assets/images/team-1.jpg";
import teamTwo from "../../assets/images/team-2.jpg";
import teamThree from "../../assets/images/team-3.jpg";

const TeamHomeOne = ({ className }) => {
    return (
        <section
            className={`appie-team-area pt-90 pb-100 ${className || ""}`}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="appie-section-title text-center">
                            <h3 className="appie-title">
                                Our Team Members
                            </h3>
                            <p>
                                The heart of our project
                            </p>
                        </div>
                    </div>
                </div>
                {/* Center the three members */}
                <div className="row justify-content-center">
                    {[
                        { img: teamOne, name: "Cesar Lira", role: "FrontEnd" },
                        { img: teamTwo, name: "Oriol Morell", role: "Full-stack" },
                        { img: teamThree, name: "Gerard Vello", role: "Full-stack" }
                    ].map((member, idx) => (
                        <div key={idx} className="col-lg-4 col-md-6">
                            <div
                                className="appie-team-item mt-30 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay={`${200 + idx * 200}ms`}
                            >
                                <div className="thumb">
                                    <img src={member.img} alt={member.name} />
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-pinterest-p" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content text-center">
                                    <h5 className="title">{member.name}</h5>
                                    <span>{member.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="team-btn text-center mt-50">
                            {/* <a className="main-btn" href="#">
                                View all Members <i className="fal fa-arrow-right" />
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamHomeOne;
