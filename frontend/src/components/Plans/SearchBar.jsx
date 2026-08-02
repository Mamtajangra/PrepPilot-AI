import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search by subject or topic..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;