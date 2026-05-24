import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder,
  style,
}) => {
  return (
    <div
      className="search-container"
      style={{
        position: "relative",
        ...style,
      }}
    >
      <FaSearch
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#6c757d",
          fontSize: "14px",
        }}
      />

      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          paddingLeft: "35px",
        }}
      />
    </div>
  );
};

export default SearchBar;
