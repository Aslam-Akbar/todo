const Content = ({ handleClick, handleDelete, list }) => {
  return (
    <div className="flex flex-col items-center w-screen justify-center mb-6">
      {list.length ? (
        <ul className="w-4/5 bg-white flex flex-col items-center justify-center min-h-96">
          {list.map((item) => (
            <li key={item.id} className="my-2 flex justify-center items-center">
              {/* Use of label for checkbox improves accessibility */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleClick(item.id)}
                  className="mx-2"
                  aria-label={`Mark ${item.item} as completed`} // Adding aria-label for better accessibility
                />
                <span
                  style={item.checked ? { textDecoration: "line-through" } : {}}
                >
                  {item.item}
                </span>
              </label>
              <button
                className="ml-4 btn bg-blue-700 rounded-xl px-5 py-1 text-white"
                onClick={() => handleDelete(item.id)}
                aria-label={`Delete ${item.item}`} // Adding aria-label for better accessibility
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-[50vw] bg-white flex items-center h-96 justify-center">
          <h1 className="text-xl">Your List is Empty!</h1>
        </div>
      )}
    </div>
  );
};

export default Content;
