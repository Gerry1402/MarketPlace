import React from 'react';
import projectImg from "../../assets/images/ropa.jpg";

const ProjectHighlight = ({ className }) => (
  <section className={`appie-featured-project-area pt-100 pb-100 ${className || ''}`}>
    <div className="container">
      <div className="row align-items-center">
        {/* Columna izquierda: imagen y pie de foto */}
        <div className="col-lg-6 mb-30">
          <div className="project-thumb">
            <img
              src={projectImg}
              alt="Proyecto GreenHome"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </div>
          <p className="mt-15 text-muted">
            GreenHome: reforma total de vivienda con criterios sostenibles —
            paneles solares en cubierta, recogida de aguas grises y
            aislamiento natural.
          </p>
        </div>

        {/* Columna derecha: título y descripción */}
        <div className="col-lg-6">
          <div className="appie-section-title">
            <h3 className="appie-title">Proyecto Destacado</h3>
            <p>
              En este proyecto transformamos una antigua casa unifamiliar en un
              hogar de alta eficiencia energética. Desde la selección de
              materiales hasta el diseño interior, todo gira en torno a la
              sostenibilidad y el confort.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectHighlight;
