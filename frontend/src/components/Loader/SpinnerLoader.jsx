import React from "react";

const SpinnerLoader = ({
  size = 24, // default size (px)
  color = "text-blue-600", // default color
  className = "",
  fullScreen = false,
}) => {
  return (
    <div
      role="status"
      className={`${fullScreen ? "fixed inset-0 flex items-center justify-center bg-white/70 z-50" : "inline-flex"} ${className}`}
    >
      <svg
        aria-hidden="true"
        className={`animate-spin ${color}`}
        style={{ width: size, height: size }}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Transparent spinner arc */}
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="transparent"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M25 5a20 20 0 0 1 20 20h-5a15 15 0 0 0-15-15V5z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
