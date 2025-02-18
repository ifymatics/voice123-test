import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import SearchBar from "./../../src/components/searchBar/SearchBar";

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What are you looking for?")
    ).toBeInTheDocument();
  });

  it("updates the input value as the user types", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText("What are you looking for?");
    fireEvent.change(input, { target: { value: "Voice actor" } });

    expect(input).toHaveValue("Voice actor");
  });

  it("calls onSearch when the search icon is clicked", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("What are you looking for?");
    const searchButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Voice actor" } });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith("Voice actor");
  });

  it("calls onSearch when the Enter key is pressed", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("What are you looking for?");

    fireEvent.change(input, { target: { value: "Voice actor" } });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    expect(onSearch).toHaveBeenCalledWith("Voice actor");
  });

  it("does not call onSearch when input is empty and search icon is clicked", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("does not call onSearch when input is empty and Enter key is pressed", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("What are you looking for?");
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    expect(onSearch).not.toHaveBeenCalled();
  });
});
