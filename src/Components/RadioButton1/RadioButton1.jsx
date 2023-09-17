import React from 'react';
import './RadioButton1.css'

const RadioButton1 = ({ label, checked, onChange, className }) => {
  return (
    <label className={`radio-label ${className}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="radio-input"
      />
      {label}
    </label>
  );
};

export default RadioButton1;
