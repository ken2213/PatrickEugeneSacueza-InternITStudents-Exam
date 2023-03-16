import React from 'react';
import "./modal_css.css";

function Modal(props) {
  if (!props.isOpen) return null;
  return (
    <div className="modal-overlay">
     <div className="modal-container">
        <div className='header'>        
        </div>
          {props.children}
        </div>
      </div>
  );
}
export default Modal;