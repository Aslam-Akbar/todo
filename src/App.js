import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import ApiRequest from "./ApiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [list, setList] = useState([]); // Renamed for clarity
  const [item, setItem] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received!");
        const listItems = await response.json();
        setList(listItems);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch items with a delay
    const timer = setTimeout(fetchItems, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleClick = async (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setList(updatedList);
    const myItem = updatedList.find((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem.checked }),
    };

    try {
      const reqUrl = `${API_URL}/${id}`;
      const result = await ApiRequest(reqUrl, updateOptions);
      // Handle success
      if (result.error) setFetchError(result.error);
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  const handleDelete = async (id) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, deleteOptions);
    if (result.error) setFetchError(result.error);
  };

  const add = async (itemName) => {
    const newItem = { checked: false, item: itemName };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };
    const result = await ApiRequest(API_URL, postOptions);
    if (result.error) {
      setFetchError(result.error);
    } else {
      setList([...list, { ...newItem, id: result.id }]); // Assuming the API returns the new item's ID
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) {
      alert("Please enter an item name."); // User feedback for empty submission
      return;
    }
    add(item);
    setItem("");
  };

  const filteredList =
    search.length === 0
      ? list
      : list.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="flex flex-col justify-between w-screen bg-gray-200 min-h-screen text-center">
      <Header />
      <div className="flex flex-col items-center w-screen justify-center mb-6">
        <AddItem handleSubmit={handleSubmit} item={item} setItem={setItem} />
        <SearchItem search={search} setSearch={setSearch} />
        <main>
          {fetchError && (
            <div className="w-[50vw] bg-white flex items-center h-96">
              <h1 className="w-full h-6">{fetchError}</h1>
            </div>
          )}
          {loading && (
            <div className="w-[50vw] bg-white flex items-center h-96">
              <h1 className="w-full h-6">Data is loading...</h1>
            </div>
          )}
          {!loading && !fetchError && (
            <Content
              list={filteredList}
              handleClick={handleClick}
              handleDelete={handleDelete}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
