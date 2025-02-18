import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Paginator from "../../src/components/paginator/Paginator";
import React from "react";

describe("Paginator Component", () => {
  const setup = (currentPage, totalPages, onPageChange) => {
    render(
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  };

  it("renders correctly with the given currentPage and totalPages", () => {
    setup(1, 5, vi.fn());

    // Check if pagination is rendered with correct number of pages
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("disables the previous button on the first page", () => {
    setup(1, 5, vi.fn());

    const prevButton = screen.getByLabelText("Go to previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    setup(5, 5, vi.fn());

    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toBeDisabled();
  });

  it("enables both previous and next buttons on middle pages", () => {
    setup(3, 5, vi.fn());

    const prevButton = screen.getByLabelText("Go to previous page");
    const nextButton = screen.getByLabelText("Go to next page");
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("calls onPageChange with the correct page number when a page is clicked", () => {
    const onPageChange = vi.fn();
    setup(1, 5, onPageChange);

    const page2 = screen.getByText("2");
    fireEvent.click(page2);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with the correct page number when navigating using the next button", () => {
    const onPageChange = vi.fn();
    setup(1, 5, onPageChange);

    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with the correct page number when navigating using the previous button", () => {
    const onPageChange = vi.fn();
    setup(2, 5, onPageChange);

    const prevButton = screen.getByLabelText("Go to previous page");
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("renders the correct number of pages", () => {
    setup(1, 3, vi.fn());

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("handles edge case when totalPages is 1", () => {
    setup(1, 1, vi.fn());

    expect(screen.getByText("1")).toBeInTheDocument();
    const prevButton = screen.getByLabelText("Go to previous page");
    const nextButton = screen.getByLabelText("Go to next page");
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
