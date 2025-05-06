import React from 'react';
import projectImg from "../../assets/images/ropa.jpg";

const ProjectHighlight = ({ className }) => (
  <section className={`appie-featured-project-area pt-100 pb-100 ${className || ''}`}>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-30">
          <div className="project-thumb">
            <img
              src={projectImg}
              alt="Proyecto GreenHome"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </div>
          <p className="mt-15 text-muted">
          We firmly believe in the power of technology to connect needs with solutions in an inclusive, efficient and sustainable way
          </p>
        </div>

        {/* Columna derecha: título y descripción */}
        <div className="col-lg-6">
          <div className="appie-section-title">
            <h3 className="appie-title">Why One MarketPlace?</h3>
            <p>
            The name “ONE” represents our vision of unity. A single platform for multiple needs, a connected community, and an opportunity for entrepreneurs, consumers, and organizations to positively impact
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectHighlight;
