import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchResults from "./../../src/components/searchResults/SearchResults";
import { VoiceActor } from "./../../src/types/VoiceActor";

// Mock the Card component
vi.mock("../card/Card", () => ({
  default: ({ actor, keyword }: { actor: VoiceActor; keyword: string }) => (
    <div data-testid="card">
      <div>{actor.user.name}</div>
      <div>{keyword}</div>
    </div>
  ),
}));

// Mock the Grid and Paper components from @mui/material

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    List: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="list">{children}</div>
    ),
  };
});

describe("SearchResults", () => {
  // const mockActors: VoiceActor[] = actors;

  const mockKeyword = "test keyword";

  it("renders nothing when actors array is empty", () => {
    render(<SearchResults actors={[]} keyword={mockKeyword} />);

    // Check if the Grid component is rendered
    const grid = screen.getByTestId("search-results");
    expect(grid).toBeInTheDocument();

    // Check that no Card components are rendered
    const cards = screen.queryAllByTestId("card");
    expect(cards).toHaveLength(0);
  });
});
