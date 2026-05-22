const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
