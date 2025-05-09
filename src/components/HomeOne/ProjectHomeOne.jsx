import React from "react";
import projectThumb from "../../assets/images/project-thumb.png";

const ProjectHomeOne = ({ className }) => {
    return (
        <>
            <section className={`appie-project-area pb-100 ${className || ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div
                                className="appie-project-box wow animated slideInUp"
                                data-wow-duration="1000ms"
                                data-wow-delay="0ms"
                            >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="appie-project-content">
                                            <h3 className="title">
                                                Start your project with appie.
                                            </h3>
                                            <p>
                                                We will email you only about
                                                this product.
                                            </p>
                                            <form action="#">
                                                <div className="input-box mt-30">
                                                    <input
                                                        type="text"
                                                        placeholder="Your Email"
                                                    />
                                                    <button type="button">
                                                        Subscribe
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="appie-project-thumb">
                                    <img src={projectThumb} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectHomeOne;
