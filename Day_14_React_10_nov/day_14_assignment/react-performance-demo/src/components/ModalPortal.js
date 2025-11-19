import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root") || (() => {
  const el = document.createElement("div");
  el.id = "modal-root";
  document.body.appendChild(el);
  return el;
})();

const ModalPortal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex",
      alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h3>Portal Modal</h3>
        <p>This modal is rendered outside the main DOM tree!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPortal;
