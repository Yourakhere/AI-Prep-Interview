import React from 'react';
import { LuX } from 'react-icons/lu';

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 z-40 h-[calc(100vh)] w-150 bg-white bg-white/40 backdrop-blur-md border border-indigo-100
  dark:bg-slate-900/30 dark:border-slate-700 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h5 id="drawer-right-label" className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className=" text-gray-400 hover:text-gray-600
                      dark:text-gray-400 dark:hover:text-gray-200
                       p-1 rounded-full transition
                     hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="text-sm mx-3 mb-6">{children}</div>
    </div>
  );
};

export default Drawer;
