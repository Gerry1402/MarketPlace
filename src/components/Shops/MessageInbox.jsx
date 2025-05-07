// src/components/MessageInbox.jsx
import React, { useState, useEffect, useRef } from "react";
import useToggle     from "../../Hooks/useToggle.js";
import BackToTop     from "../BackToTop.jsx";
import FooterHomeOne from "../HomeOne/FooterHomeOne.jsx";
import Drawer        from "../Mobile/Drawer.jsx";
import HeaderNews    from "../News/HeaderNews.jsx";

const MessageInbox = () => {
  const [drawer, drawerAction] = useToggle(false);

  // Conversaciones y mensajes
  const [conversations, setConversations] = useState([]);
  const [activeConvId,   setActiveConvId]   = useState(null);
  const [newMessage,     setNewMessage]     = useState("");

  // Ref al contenedor de mensajes (no al final)
  const chatBodyRef = useRef(null);

  // Datos mock iniciales
  useEffect(() => {
    const mock = [
      {
        id: 1,
        name: "Soporte Técnico",
        messages: [
          { id: 1, from: "other", text: "Hola, ¿en qué puedo ayudarte?",   timestamp: "10:00 AM" },
          { id: 2, from: "me",    text: "Necesito ayuda con mi pedido.", timestamp: "10:02 AM" },
        ],
      },
      {
        id: 2,
        name: "Ventas",
        messages: [
          { id: 1, from: "other", text: "¡Gracias por tu interés!", timestamp: "09:30 AM" },
        ],
      },
    ];
    setConversations(mock);
    setActiveConvId(mock[0].id);
  }, []);

  // Cada vez que cambie conversación o mensajes, hacemos scroll al fondo DEL DIV
  useEffect(() => {
    const body = chatBodyRef.current;
    if (body) {
      // Al final del scroll container
      body.scrollTop = body.scrollHeight;
    }
  }, [activeConvId, conversations]);

  const activeConversation = conversations.find(c => c.id === activeConvId);

  const handleSend = () => {
    if (!newMessage.trim() || !activeConversation) return;
    setConversations(conversations.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: [
            ...c.messages,
            { id: Date.now(), from: "me", text: newMessage.trim(), timestamp: new Date().toLocaleTimeString() },
          ],
        };
      }
      return c;
    }));
    setNewMessage("");
  };

  return (
    <>
      <Drawer drawer={drawer} action={drawerAction.toggle} />
      <HeaderNews action={drawerAction.toggle} showChat={false} />

      {/* Sección con padding para no tapar por el header */}
      <section className="pt-150 pb-100">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Conversaciones</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {conversations.map(conv => (
                    <li
                      key={conv.id}
                      className={`list-group-item d-flex justify-content-between align-items-center ${
                        activeConvId === conv.id ? "active" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveConvId(conv.id)}
                    >
                      {conv.name}
                      <span className="badge badge-primary badge-pill">
                        {conv.messages.length}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Panel de mensajes */}
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-light">
                  <h5 className="mb-0">
                    {activeConversation?.name || "Selecciona una conversación"}
                  </h5>
                </div>
                {/* Aquí referenciamos el contenedor para scroll interno */}
                <div
                  ref={chatBodyRef}
                  className="card-body"
                  style={{ height: "400px", overflowY: "auto" }}
                >
                  {activeConversation
                    ? activeConversation.messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`mb-3 d-flex ${
                            msg.from === "me"
                              ? "justify-content-end"
                              : "justify-content-start"
                          }`}
                        >
                          <div
                            className={`p-2 rounded ${
                              msg.from === "me"
                                ? "bg-primary text-white"
                                : "bg-secondary text-white"
                            }`}
                          >
                            <div>{msg.text}</div>
                            <small className="text-muted">{msg.timestamp}</small>
                          </div>
                        </div>
                      ))
                    : <p>Sin conversación activa.</p>
                  }
                </div>
                <div className="card-footer d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <button className="btn btn-primary ml-2" onClick={handleSend}>
                    Enviar
                  </button>
                </div>
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

export default MessageInbox;
