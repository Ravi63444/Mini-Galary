import React from "react";
import "./searchBox.scss";

const SearchBox = ({ onSearchChange }) => {
  return (
    <div className="searchbox">
      <input
        className="inputClass"
        type="search"
        placeholder="Search Images.."
        onChange={onSearchChange}
      />
    </div>
  );
};
export default SearchBox;
