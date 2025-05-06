// src/components/Backpack.jsx

import React, { useState } from "react";
import useToggle from "../../Hooks/useToggle.js";
import Drawer from "../Mobile/Drawer.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import BackToTop from "../BackToTop.jsx";
import FooterHomeOne from "../HomeOne/FooterHomeOne.jsx";

const Backpack = () => {
  const [drawer, drawerAction] = useToggle(false);

  // Listas de artículos
  const [sellItems, setSellItems] = useState([]);
  const [tradeItems, setTradeItems] = useState([]);

  // Campos del formulario para añadir
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [section, setSection] = useState("sell"); // 'sell' o 'trade'

  const handleAdd = () => {
    if (!newName.trim()) return;

    const item = {
      id: Date.now(),
      name: newName.trim(),
      desc: newDesc.trim(),
    };

    if (section === "sell") {
      setSellItems([item, ...sellItems]);
    } else {
      setTradeItems([item, ...tradeItems]);
    }

    setNewName("");
    setNewDesc("");
  };

  return (
    <>
      <Drawer drawer={drawer} action={drawerAction.toggle} />
      <HeaderNews action={drawerAction.toggle} showChat={false} />

      <section className="pt-100 pb-100">
        <div className="container">
          <h2 className="mb-4">Tu Mochila</h2>
          <div className="row">
            {/* Formulario común */}
            <div className="col-12 mb-4">
              <div className="card p-3">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3">Sección:</label>
                  <select
                    className="form-control w-auto"
                    value={section}
                    onChange={e => setSection(e.target.value)}
                  >
                    <option value="sell">Artículos a vender</option>
                    <option value="trade">Artículos de intercambio</option>
                  </select>
                </div>
                <div className="form-row align-items-end">
                  <div className="col-md-4">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      placeholder="P. ej. Cámara vintage"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newDesc}
                      onChange={e => setNewDesc(e.target.value)}
                      placeholder="P. ej. Funciona perfecto, poco uso..."
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleAdd}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Artículos a vender */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-light">
                  Artículos a vender
                </div>
                <ul className="list-group list-group-flush">
                  {sellItems.length === 0 && (
                    <li className="list-group-item text-muted">
                      No tienes artículos para vender.
                    </li>
                  )}
                  {sellItems.map(item => (
                    <li key={item.id} className="list-group-item">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-0">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sección de Artículos de intercambio */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-light">
                  Artículos de intercambio
                </div>
                <ul className="list-group list-group-flush">
                  {tradeItems.length === 0 && (
                    <li className="list-group-item text-muted">
                      No tienes artículos para intercambio.
                    </li>
                  )}
                  {tradeItems.map(item => (
                    <li key={item.id} className="list-group-item">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-0">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterHomeOne />
      <BackToTop />
    </>
  );
};

export default Backpack;
