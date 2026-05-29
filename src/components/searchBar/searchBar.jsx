import "./searchBar.css";

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <label htmlFor="search" className="search-label">
        Search
      </label>
      <input
        id="search"
        type="text"
        placeholder="artist, genre, or country"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
