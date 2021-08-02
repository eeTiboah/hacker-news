import { useState } from "react";
import { useData } from "./data-hook";

export default Search = () => {
  const [value, setValue] = useState("");
  const { getAllData } = useData();

  const searchData = (e) => {
    getAllData(value);
    e.preventDefault();
  };

  return (
    <form onSubmit={searchData}>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
