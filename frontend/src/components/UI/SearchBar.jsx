import { Search } from "lucide-react";
import "./AICommon.css";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <Search size={20} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;

