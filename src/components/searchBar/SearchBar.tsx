import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    if (search.trim() === "") return;
    onSearch(search);
    setSearch("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="searchBar"
      style={{
        display: "flex",
        maxWidth: "800px",
        width: "100%",
        backgroundColor: "#f5f5f5",
        height: "60px",
      }}
    >
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="What are you looking for?"
        variant="outlined"
        data-testid="search-bar"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ height: "1.1rem" }}>
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
