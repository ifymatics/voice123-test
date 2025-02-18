import { useState } from "react";

import { useSearch } from "./hooks/useSearch";
import SearchResults from "./components/searchResults/SearchResults";
import Paginator from "./components/paginator/Paginator";
import Loader from "./components/loader/Loader";
import { Grid, Typography } from "@mui/material";
import NavBar from "./components/navBar/NavBar";
import SearchBar from "./components/searchBar/SearchBar";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { results, loading } = useSearch(query, page);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar>
        <SearchBar onSearch={setQuery} />
      </NavBar>
      <main style={{ marginTop: "4.5rem", width: "100%" }}>
        {loading ? (
          <Loader />
        ) : results.voiceActors.length > 0 ? (
          <Grid container spacing={1} style={{ padding: "1rem" }}>
            <SearchResults actors={results.voiceActors} keyword={query} />
            <Paginator
              currentPage={results.pagination.currentPage}
              totalPages={results.pagination.totalPages}
              onPageChange={setPage}
            />
          </Grid>
        ) : (
          <Typography
            variant="h6"
            style={{
              margin: "40px 0",
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            No voice actors found for keyword {query} :(
          </Typography>
        )}
      </main>
    </div>
  );
};
export default App;
