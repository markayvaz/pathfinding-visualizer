import React from "react";

const SidebarItem = ({ isDropdown }) => {
  return <div>{isDropdown && "Yes!"}</div>;
};

export default SidebarItem;
