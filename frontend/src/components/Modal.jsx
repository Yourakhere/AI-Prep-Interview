import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40 p-4">
  <div className="relative bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md mx-auto">
    {!hideHeader && (
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
      </div>
    )}

    <button
      type="button"
      className="absolute top-2 right-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg w-7 h-7 flex items-center justify-center"
      onClick={onClose}
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1l12 12m0-12L1 13"
        />
      </svg>
    </button>

    <div className="flex-1 overflow-y-auto max-h-[80vh] custom-scrollbar p-4">
      {children}
    </div>
  </div>
</div>

  );
};

export default Modal;
