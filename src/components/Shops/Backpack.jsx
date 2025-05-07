// src/components/Backpack.jsx
import React, { useState } from "react";
import useToggle     from "../../Hooks/useToggle.js";
import Drawer        from "../Mobile/Drawer.jsx";
import HeaderNews    from "../News/HeaderNews.jsx";
import BackToTop     from "../BackToTop.jsx";
import FooterHomeOne from "../HomeOne/FooterHomeOne.jsx";

const Backpack = () => {
  const [drawer, drawerAction] = useToggle(false);

  // Listas de artículos
  const [sellItems,  setSellItems]  = useState([]);
  const [tradeItems, setTradeItems] = useState([]);

  // Campos del formulario
  const [section, setSection] = useState("sell"); // 'sell' o 'trade'
  const [form, setForm] = useState({
    title:       "",
    description: "",
    stock:       "",
    price:       "",
    weight:      "",
    dimensions:  "",
    handmade:    false,
  });

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    // Si es stock, evitar negativos
    if (name === "stock") {
      const num = parseInt(value, 10);
      value = isNaN(num) ? "" : Math.max(0, num);
    }

    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const item = { id: Date.now(), ...form };

    if (section === "sell") {
      setSellItems([item, ...sellItems]);
    } else {
      setTradeItems([item, ...tradeItems]);
    }

    // Limpiar formulario
    setForm({
      title:       "",
      description: "",
      stock:       "",
      price:       "",
      weight:      "",
      dimensions:  "",
      handmade:    false,
    });
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
                  <label className="mr-3 mb-0">Sección:</label>
                  <select
                    className="form-control w-auto"
                    value={section}
                    onChange={e => setSection(e.target.value)}
                  >
                    <option value="sell">Artículos a vender</option>
                    <option value="trade">Artículos de intercambio</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="col-md-4 mb-3">
                    <label>Título</label>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="p.ej. Cámara vintage"
                    />
                  </div>
                  <div className="col-md-8 mb-3">
                    <label>Descripción</label>
                    <input
                      name="description"
                      type="text"
                      className="form-control"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="p.ej. Funciona perfecto, poco uso..."
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Stock</label>
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      className="form-control"
                      value={form.stock}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>Precio</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>Peso</label>
                    <input
                      name="weight"
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={form.weight}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Dimensiones</label>
                    <input
                      name="dimensions"
                      type="text"
                      className="form-control"
                      value={form.dimensions}
                      onChange={handleChange}
                      placeholder="p.ej. 10x10x10"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <input
                        name="handmade"
                        type="checkbox"
                        className="form-check-input"
                        id="handmadeCheck"
                        checked={form.handmade}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="handmadeCheck"
                      >
                        Producto hecho a mano
                      </label>
                    </div>
                  </div>

                  <div className="col-12 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={handleAdd}
                    >
                      Añadir artículo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Artículos a vender */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-light">Artículos a vender</div>
                <ul className="list-group list-group-flush">
                  {sellItems.length === 0 && (
                    <li className="list-group-item text-muted">
                      No tienes artículos para vender.
                    </li>
                  )}
                  {sellItems.map(item => (
                    <li key={item.id} className="list-group-item">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="mb-0">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sección de Artículos de intercambio */}
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-light">Artículos de intercambio</div>
                <ul className="list-group list-group-flush">
                  {tradeItems.length === 0 && (
                    <li className="list-group-item text-muted">
                      No tienes artículos para intercambio.
                    </li>
                  )}
                  {tradeItems.map(item => (
                    <li key={item.id} className="list-group-item">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="mb-0">{item.description}</p>
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
