import { usePaginatedHero } from "./usePaginateHero";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

vi.mock("../actions/get-heroes-by-page.action", () => ({
  getHeroesByPageAction: vi.fn(),
}));
let queryClient: QueryClient;
const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);
const wrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
describe("usePaginatedHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
   queryClient = new QueryClient();
  queryClient.clear();
    
  });
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: wrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });
  test("Should return success state with data when API call succeds", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: wrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
    /* console.log(result.current); */
  });
  test("Should call getHeroesByPageAction with arguments", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginatedHero(1, 6,'heroesAbc'), {
      wrapper: wrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6,'heroesAbc');
    /* console.log(result.current); */
  });
});
