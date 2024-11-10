import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <div>
      <form className="flex items-center">
        <input
          className=" px-2 rounded-lg my-3 border-solid border-2 border-slate-300 h-8 w-[27vw]"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => e.preventDefault(setSearch(e.target.value))}
        ></input>
      </form>
    </div>
  );
};

export default SearchItem;
