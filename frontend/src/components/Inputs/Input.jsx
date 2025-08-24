import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      {label && <label className="text-[13px] text-slate-800">{label}</label>}

      <div className="input-box">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === 'password' && (
          showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer "
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer "
              onClick={toggleShowPassword}
            />

          )
        )}
      </div>
    </div>
  );
};

export default Input;
