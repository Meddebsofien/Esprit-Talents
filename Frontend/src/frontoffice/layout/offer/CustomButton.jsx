import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className="text-white py-2 md:py3 px-3 md:px-10  bg-blue-600 rounded-full md:rounded-md text-sm md:text-base"
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
