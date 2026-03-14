import { describe, expect, test, vi } from "vitest";
import { useHeroSumary } from "./useHeroSumary";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInformationResponse } from "../type/summary-information.response";

vi.mock("../actions/get-summary.action", () => ({
  getSummaryAction: vi.fn(),
}));
const mockGetSummaryAction = vi.mocked(getSummaryAction);
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

describe("UseHeroSumary", () => {
  test("Should return the initial State (IsLoading)", () => {
    const { result } = renderHook(() => useHeroSumary(), {
      wrapper: wrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
    /*  console.log(result.current); */
  });

  test("Should return success state with data when API call succeeds", async () => {
    const mocksummaryData = {
      totalHeroes: 100,
      strongestHero: {
        id: "10",
        name: "Superman",
      },
      smartestHero: {
        id: "2",
        name: "batman",
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mocksummaryData);

    const { result } = renderHook(() => useHeroSumary(), {
      wrapper: wrapper(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.isError).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
    /* expect(mockGetSummaryAction).toHaveBeenCalledWith();  */
  });

  test("should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch summary");
    mockGetSummaryAction.mockRejectedValue(mockError);
    const { result } = renderHook(() => useHeroSumary(), {
      wrapper: wrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  /*   expect(result.current.error).toBeUndefined(); */
    expect(result.current.isLoading).toBe(false);    
    expect(mockGetSummaryAction).toHaveBeenCalled();
    /*   expect(mockGetSummaryAction).toHaveBeenCalledTimes(1); */
    expect(result.current.error?.message).toBe("Failed to fetch summary");
  
  });
});
