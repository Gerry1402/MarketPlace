import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import user1 from '../../assets/images/pabloMonteserin.jpg';
import user2 from '../../assets/images/Alex.jpg';
import user3 from '../../assets/images/Victor.jpg';

const TestimonialHomeOne = ({ className }) => {
    const sliderRef = useRef();
    const sliderNext = () => {
        sliderRef.current.slickNext();
    };
    const sliderPrev = () => {
        sliderRef.current.slickPrev();
    };
    return (
        <section className={`appie-testimonial-area pt-100 pb-160 ${className || ''}`} id="testimonial">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="appie-testimonial-slider" style={{ position: 'relative' }}>
                            <span
                                className="prev slick-arrow"
                                onClick={sliderNext}
                                role="button"
                                tabIndex="0">
                                <i className="fal fa-arrow-left" />
                            </span>
                            <Slider ref={sliderRef} dots arrows={false}>
                                <div className="appie-testimonial-item text-center">
                                    <div className="author-info">
                                        <img
                                            src={user1}
                                            alt="Pablo Monteserin"
                                            style={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                margin: '0 auto 15px',
                                            }}
                                        />
                                        <h5 className="title">Pablo Monteserin</h5>
                                        <span>April 14, 2025</span>
                                    </div>
                                    <div className="text">
                                        <p>
                                            I’m absolutely in love with this shop! I bought several handmade
                                            pieces and you can truly feel the care and craftsmanship behind
                                            each item. The quality is outstanding, and I love supporting small
                                            artisans who care about the planet. I’ll definitely be back!
                                        </p>
                                        <ul>
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <li key={i}>
                                                        <i className="fas fa-star" />
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="appie-testimonial-item text-center">
                                    <div className="author-info">
                                        <img
                                            src={user2}
                                            alt="Jane Doe"
                                            style={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                margin: '0 auto 15px',
                                            }}
                                        />
                                        <h5 className="title">Alex Lira</h5>
                                        <span>May 2, 2025</span>
                                    </div>
                                    <div className="text">
                                        <p>
                                            Wonderful shopping experience. The products are high-quality and,
                                            best of all, environmentally friendly. It’s great to find a
                                            marketplace that promotes sustainability and responsibility.
                                            Highly recommended!
                                        </p>
                                        <ul>
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <li key={i}>
                                                        <i className="fas fa-star" />
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="appie-testimonial-item text-center">
                                    <div className="author-info">
                                        <img
                                            src={user3}
                                            alt="Bob Smith"
                                            style={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                margin: '0 auto 15px',
                                            }}
                                        />
                                        <h5 className="title">Victor Lozano</h5>
                                        <span>June 10, 2025</span>
                                    </div>
                                    <div className="text">
                                        <p>
                                            I was pleasantly surprised by the variety and detail in the
                                            handmade items. Everything arrived in perfect condition, with
                                            eco-friendly and recyclable packaging. You can tell they truly
                                            care about sustainability. Five stars!
                                        </p>
                                        <ul>
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <li key={i}>
                                                        <i className="fas fa-star" />
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </Slider>
                            <span
                                className="next slick-arrow"
                                onClick={sliderPrev}
                                role="button"
                                tabIndex="0">
                                <i className="fal fa-arrow-right" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialHomeOne;
