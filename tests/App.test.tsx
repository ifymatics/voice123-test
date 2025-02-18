import React, { ChangeEvent } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../src/App";
import { useSearch } from "./../src/hooks/useSearch";
import { VoiceActor } from "./../src/types/VoiceActor";
import { actors } from "./__mocks__/actors";

// Mock the useSearch hook
vi.mock("../src/hooks/useSearch", () => ({
  useSearch: vi.fn(),
}));

vi.mock("./../src/components/searchResults/SearchResults", () => ({
  default: ({ actors, keyword }: { actors: VoiceActor[]; keyword: string }) => (
    <div data-testid="search-results">
      {actors.map((actor: VoiceActor) => (
        <div key={actor.id}>{actor.user.name}</div>
      ))}
      <div>{keyword}</div>
    </div>
  ),
}));

// Mock the Paginator component

vi.mock("../src/components/paginator/Paginator", () => {
  return {
    default: ({
      currentPage,
      onPageChange,
    }: {
      currentPage: number;
      totalPages: number;
      onPageChange: (page: number) => void;
    }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [page, setPage] = React.useState(currentPage);

      const handleNext = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        onPageChange(nextPage);
      };

      const handlePrevious = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        onPageChange(prevPage);
      };

      return (
        <div data-testid="paginator">
          <button onClick={handlePrevious} disabled={page <= 1}>
            Previous
          </button>
          <span>{page}</span>
          <button onClick={handleNext} disabled={page >= 5}>
            Next
          </button>
        </div>
      );
    },
  };
});

// Mock the Loader component
vi.mock("../src/components/loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

// Mock the NavBar component
vi.mock("../src/components/navBar/NavBar", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="nav-bar">{children}</nav>
  ),
}));

// Mock the SearchBar component
vi.mock("../src/components/searchBar/SearchBar", () => ({
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <input
      data-testid="search-bar"
      onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
    />
  ),
}));

describe("App", () => {
  let currentPage: number;

  beforeEach(() => {
    // Reset all mocks before each test
    currentPage = 2; // Initial page
    vi.mocked(useSearch).mockImplementation(() => ({
      results: {
        voiceActors: actors,
        pagination: {
          currentPage,
          totalPages: 5,
          pageSize: 10,
        },
      },
      loading: false,
      error: null,
    }));
  });

  it("renders the App component", () => {
    render(<App />);
    expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("displays the loader when loading is true", () => {
    // Mock the useSearch hook to return loading as true
    vi.mocked(useSearch).mockReturnValue({
      results: {
        voiceActors: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
        },
      },
      loading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("displays search results when data is available", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("search-results")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("updates the query state when typing in the search bar", () => {
    render(<App />);
    const searchBar = screen.getByTestId("search-bar") as HTMLInputElement;
    fireEvent.change(searchBar, {
      target: { value: "new query" },
    });
    expect(searchBar.value).toBe("new query");
  });

  it("updates the page state when pagination buttons are clicked", () => {
    render(<App />);
    const nextButton = screen.getByText("Next");
    const previousButton = screen.getByText("Previous");

    // Click "Next" button
    fireEvent.click(nextButton);
    expect(screen.getByText("3")).toBeInTheDocument();

    // Click "Previous" button
    fireEvent.click(previousButton);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
