import React from "react";
import odsLogo from "../../assets/images/icon/ODSLogo.png";
import logo1 from "../../assets/images/icon/ODS12.png";
import logo2 from "../../assets/images/icon/ODS8.png";
import logo3 from "../../assets/images/icon/ODS9.png";

const features = [
  { logo: logo1, title: "Zero Hunger" },
  { logo: logo2, title: "Decent Work & Growth" },
  { logo: logo3, title: "Innovation & Infrastructure" },
];

const TrafficHomeOne = () => {
  return (
    <section
      className="appie-services-2-area appie-services-8-area pt-90 pb-55"
      id="service"
    >
      <div className="container">
        {/* Título */}
        <div className="row align-items-end mb-30">
          <div className="col-lg-6 col-md-8">
            <div className="appie-section-title">
              <h3 className="appie-title">Our commitment</h3>
              <p>These are the SDGs we have worked with</p>
            </div>
          </div>
        </div>

        {/* Icons + Texto */}
        <div className="row align-items-start">
          <div className="col-lg-7">
            <div className="row">
              {features.map((f, i) => (
                <div key={i} className="col-lg-6 col-md-6 text-center">
                  <div
                    className="appie-single-service-2 appie-single-service-about mt-30 wow animated fadeInUp"
                    data-wow-duration="2000ms"
                    data-wow-delay={`${200 + i * 200}ms`}
                  >
                    <div
                      className="icon mx-auto"
                      style={{
                        marginBottom: "10px",
                        width: "180px",      // ancho fijo mayor
                        height: "180px",     // alto fijo
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={f.logo}
                        alt={f.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain", // mantiene proporciones
                        }}
                      />
                    </div>
                    <h4 className="title mb-0">{f.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen grande al lado */}
          <div className="col-lg-5 d-flex justify-content-center align-items-start">
            <div className="service-thumb mt-30">
              <img
                src={odsLogo}
                alt="ODS Logo"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrafficHomeOne;
