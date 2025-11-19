import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function ModalPortal({ isOpen, onClose, children }) {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    const handleEsc = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => {
      modalRoot.removeChild(el);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [el, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', padding: '20px', borderRadius: '8px', minWidth: '300px'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ float: 'right' }}>✖</button>
        {children}
      </div>
    </div>,
    el
  );
}
