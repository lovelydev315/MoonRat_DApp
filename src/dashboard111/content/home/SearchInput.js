import React, {useState} from "react";

const SearchInput = (props) => {
  const onChange = props.onChange || function() {}
  function setForce(event) {
    event.stopPropagation();
    if(event.target.className !== "admin-header-search") return;
    event.target.children[0].focus();
  }
  return (
    <div className="customer-header-search" onClick={setForce}>
      <input type="text" className="admin-header-search-input" onChange={onChange} />
    </div>
  )
}

export default SearchInput;