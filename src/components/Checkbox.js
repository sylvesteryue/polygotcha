import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange, disabled }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
        disabled={disabled}
      />
      {label}
    </label>
  </div>
);

export default Checkbox;