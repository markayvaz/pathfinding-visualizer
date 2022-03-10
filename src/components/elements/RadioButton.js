import React from "react";

const RadioButton = ({ id, label, value, group, disabled }) => {
  return (
    <div class="flex items-center mb-4">
      <input
        id={id}
        type="radio"
        name={group}
        value={value}
        class="cursor-pointer w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        disabled={disabled}
      />
      <label
        for={id}
        class="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
