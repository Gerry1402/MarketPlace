import React from 'react';
import IconReact from '../../assets/images/icon/reactLogo1.png';
import IconBootstrap from '../../assets/images/icon/bootstrapLogo.jpg';
import IconSupabase from '../../assets/images/icon/supabaseIcon.png';
import IconJs from '../../assets/images/icon/Javascript.jpg';
import IconHtml from '../../assets/images/icon/htmlLogo.png';
import IconCss from '../../assets/images/icon/CssLogo.png';

const tools = [
    { src: IconReact, title: 'React' },
    { src: IconBootstrap, title: 'Bootstrap' },
    { src: IconSupabase, title: 'SupaBase' },
    { src: IconJs, title: 'JavaScript' },
    { src: IconHtml, title: 'HTML' },
    { src: IconCss, title: 'CSS' },
];

const ServicesHomeOne = ({ className }) => {
    return (
        <section className={`appie-service-area pt-90 pb-100 ${className || ''}`} id="service">
            <div className="container">
                <div className="row justify-content-center mb-50">
                    <div className="col-12 text-center">
                        <h1 className="appie-title">Technologies used</h1>
                        <p>FrontEnd, BackEnd and Language</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {tools.map((tool, i) => (
                        <div key={i} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <div className="appie-single-service text-center mt-30">
                                <div className="icon">
                                    <img src={tool.src} alt={tool.title} />
                                </div>
                                <h4 className="appie-title">{tool.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesHomeOne;
