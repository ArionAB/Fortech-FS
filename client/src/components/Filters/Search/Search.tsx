import { useContext } from "react";

import { SearchContext } from "../../Context/searchContext";
import { ClasaContext } from "../../Context/filterClassContext";
import { SortContext } from "../../Context/sortContext";
import "./Search.styles.scss";

const Search = () => {
  const { searchVal, setSearchVal } = useContext(SearchContext);
  const { filterVal, setFilterVal } = useContext(ClasaContext);
  const { sortVal, setSortVal } = useContext(SortContext);

  return (
    <div className="search-container">
      <label className="search-label">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal || ""}
        />
      </label>

      <select
        onChange={(e) => setFilterVal(e.target.value)}
        className="search-label"
      >
        <option value="">All</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <select
        onChange={(e) => setSortVal(e.target.value)}
        className="search-label"
      >
        <option value="">Sort</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
};

export default Search;
