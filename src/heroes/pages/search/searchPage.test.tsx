import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./searchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHerosAction } from "@/heroes/actions/search-heros.action";
import type { Hero } from "@/heroes/type/hero.interface";

vi.mock("@/heroes/actions/search-heros.action");
const mockSearchHeroAction = vi.mocked(searchHerosAction);
const queryClient = new QueryClient();
const renderSearchPage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};
vi.mock("@/components/custom/CustomJumbotrom", () => ({
  CustomJumbotrom: () => <div data-testid="custom-jumbotrom"></div>,
}));
vi.mock("@/heroes/components/HeroGrid", () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));
describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("Should render SearchPage with default values", () => {
    const { container } = renderSearchPage();
    expect(mockSearchHeroAction).toHaveBeenCalledWith({
      name: undefined,
      strength: undefined,
    });
    expect(container).toMatchSnapshot();
  });

  test("Should render SearchPage with default values", () => {
    const { container } = renderSearchPage(["/search?name=superman"]);
    expect(mockSearchHeroAction).toHaveBeenCalledWith({
      name: "superman",
      strength: undefined,
    });
    expect(container).toMatchSnapshot();
  });
  test("Should render SearchPage with strength parameters", () => {
    const { container } = renderSearchPage(["/search?strength=6"]);
    expect(mockSearchHeroAction).toHaveBeenCalledWith({
      name: undefined,
      strength: "6",
    });
    expect(container).toMatchSnapshot();
  });
  test("Should render SearchPage with strength and name parameters", () => {
    const { container } = renderSearchPage(["/search?strength=8&name=batman"]);
    expect(mockSearchHeroAction).toHaveBeenCalledWith({
      name: "batman",
      strength: "8",
    });
    expect(container).toMatchSnapshot();
  });
  test("should render HeroGrid with search results", async () => {
    const mockHeroes = [
      { id: "1", name: "Clark Kent" } as unknown as Hero,
      { id: "2", name: "Bruce Wayne" } as unknown as Hero,
    ];
    mockSearchHeroAction.mockResolvedValue(mockHeroes);
    renderSearchPage();
    await waitFor(() => {
      expect(screen.getByText("Clark Kent")).toBeDefined();
      expect(screen.getByText("Bruce Wayne")).toBeDefined();
    });
    screen.debug(screen.getByTestId("hero-grid"));
  });
});
