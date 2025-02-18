import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" size={100} />
      <h3 style={{ marginTop: "25px", color: "#888", alignItems: "center" }}>
        We are searching for the voice actors you requested, bear with us...
      </h3>
    </div>
  );
};

export default Loader;
