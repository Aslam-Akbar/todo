import React from "react";
import { useRef } from "react";

const AddItem = ({ handleSubmit, item, setItem }) => {
  const inputRef = useRef();
  const focusInput = () => {
    inputRef.current && inputRef.current.focus();
  };

  return (
    <div className="flex items-center">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          autoFocus
          ref={inputRef}
          className="ml-6 rounded-lg border-solid border-2 border-slate-300 h-8 w-3/4"
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        ></input>
        <button
          type="button"
          className="mx-5 btn bg-blue-700 rounded-xl px-5 my-3 py-1 w-36 text-white"
          onClick={(e) => handleSubmit(e) || focusInput()}
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
