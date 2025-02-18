import React from "react";
import {
  Pagination as MuiPagination,
  PaginationItem,
  Paper,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;

  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event.preventDefault());
    onPageChange(page);
  };

  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        width: "60%",
        borderRadius: "12px",
        margin: "16px auto",
      }}
    >
      <MuiPagination
        page={currentPage}
        count={totalPages}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
      />
    </Paper>
  );
};

export default Paginator;
