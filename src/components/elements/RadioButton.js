import React from "react";

const RadioButton = ({
  id,
  label,
  value,
  group,
  isDisabled,
  setChecked,
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type="radio"
        name={group}
        value={value}
        className="cursor-pointer w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
        disabled={isDisabled}
        onChange={setChecked}
      />
      <label
        htmlFor={id}
        className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 hover:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
