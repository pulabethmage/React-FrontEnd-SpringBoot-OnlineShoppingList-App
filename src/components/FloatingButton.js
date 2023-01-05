import React from "react";

function FloatingButton() {
  return (
    <div>
      <div
        style={{ zIndex: "1" }}
        className="me-2 mb-4 position-fixed bottom-0 end-0 px-1 py-2 text-dark mb-2 text-center rounded-circle bg-cuscolordelete"
      >
        <a
          href="additem.html"
          className="d-block text-decoration-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i
            className="bi bi-plus-circle text-white p-2"
            style={{ verticalAlign: "middle" }}
          ></i>
        </a>
      </div>
    </div>
  );
}

export default FloatingButton;
