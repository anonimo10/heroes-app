import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginateHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/context/FavoriteHeroContext";
vi.mock("@/heroes/hooks/usePaginateHero");
const queryClient = new QueryClient();
const mockusePaginateHero = vi.mocked(usePaginatedHero);
const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};
mockusePaginateHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof mockusePaginateHero>);

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should render HomePage with default values", () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
    screen.debug();
  });
  test("should call usePaginateHero with default values", () => {
    renderHomePage();
    expect(mockusePaginateHero).toHaveBeenCalledWith(1, 6, "all");
  });
  test("should call usePaginateHero with custom query params", () => {
    renderHomePage(["/?page=2&limit=10&category=villains"]);
    expect(mockusePaginateHero).toHaveBeenCalledWith(2, 10, "villains");
  });
  test("should called usePaginatedHero with default page and same limit on tab clicked ", () => {
    renderHomePage(["/?tab=favorites&page=2&limit=10"]);
      /* expect(mockusePaginateHero).toHaveBeenCalledWith(2, 10, "villains"); */
      const [, , , villainsTab] = screen.getAllByRole('tab');
      fireEvent.click(villainsTab);
      expect(mockusePaginateHero).toHaveBeenCalledWith(1, 10, "villain"); 
      screen.debug(villainsTab);
  });
});
