import { ReactNode } from "react";
import { AppBar } from "@mui/material";
const NavBar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppBar
      style={{
        background: "white",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      data-testid="navbar"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            alt="Voice123 Logo"
            src="https://voice123.com/static/img/logo-blm.0195be51.svg"
            style={{ width: "130px", marginRight: "16px" }}
          />
        </div>
        <div style={{ flex: 1 }} />
        {children}
        <div style={{ flex: 1 }} />
      </div>
    </AppBar>
  );
};

export default NavBar;
