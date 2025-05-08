import React from "react";
import projectThumb from "../../assets/images/icon/Duda.png";
// Importa tu foto de fondo:
import bgPhoto from "../../assets/images/fondoSend.png";

const ProjectHomeOne = ({ className }) => {
  return (
    <section className={`appie-project-area pb-100 ${className || ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="appie-project-box wow animated slideInUp"
              data-wow-duration="1000ms"
              data-wow-delay="0ms"
              style={{
                position: "relative",
                overflow: "hidden",
                // Aquí aplicamos la foto de fondo:
                backgroundImage: `url(${bgPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* CONTENIDO SOBRE LA FOTO */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="appie-project-content">
                      <p style={{ color: "#fff" }}>Want to know more?</p>
                      <h3 className="title" style={{ color: "#fff" }}>
                        Contact us!
                      </h3>
                      <form action="#">
                        <div
                          className="input-box mt-30"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "stretch",
                            maxWidth: "400px",
                          }}
                        >
                          <input
                            type="email"
                            placeholder="Your Email"
                            style={{
                              width: "100%",
                              marginBottom: "15px",
                            }}
                          />
                          <textarea
                            placeholder="Your Message"
                            style={{
                              width: "100%",
                              marginBottom: "15px",
                              minHeight: "120px",
                              resize: "vertical",
                            }}
                          />
                          <button
                            type="button"
                            className="main-btn"
                            style={{
                              width: "100%",
                              background: "#2B70FA"
                            }}
                          >
                            Send
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
              {/* FIN CONTENIDO */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHomeOne;
