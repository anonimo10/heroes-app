import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { HeroStats } from "./HeroStats";
import { useHeroSumary } from "../hooks/useHeroSumary";
import type { SummaryInformationResponse } from "../type/summary-information.response";
import { FavoriteHeroProvider } from "@/context/FavoriteHeroContext";

vi.mock("../hooks/useHeroSumary");
const mockUseHeroSumary = vi.mocked(useHeroSumary);
const mockHero = {
  id: "1",
  name: "Clark Kent",
  slug: "clark-kent",
  alias: "Superman",
  powers: [
    "Súper fuerza",
    "Vuelo",
    "Visión de calor",
    "Visión de rayos X",
    "Invulnerabilidad",
    "Súper velocidad",
  ],
  description:
    "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: "Liga de la Justicia",
  image: "1.jpeg",
  firstAppearance: "1938",
  status: "Active",
  category: "Hero",
  universe: "DC",
};
const mockSumaryData: SummaryInformationResponse = {
  totalHeroes: 25,
  strongestHero: {
    id: "1",
    name: "Clark Kent",
    slug: "clark-kent",
    alias: "Superman",
    powers: [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad",
    ],
    description:
      "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: "Liga de la Justicia",
    image: "1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
  if (mockData) {
    mockUseHeroSumary.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof useHeroSumary>);
  } else {
    mockUseHeroSumary.mockReturnValue({
      data: undefined,
    } as unknown as ReturnType<typeof useHeroSumary>);
  }

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>,
  );
};

describe("HeroStats", () => {
   test("Shoul render component with default values", () => {
    const { container } = renderHeroStats();
    expect(screen.getByText("Loading....")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test("shouls render HeroStats with mock information", () => {
    const { container } = renderHeroStats(mockSumaryData);
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Total Characters")).toBeDefined();
    expect(screen.getByText("Favorito")).toBeDefined();
    expect(screen.getByText("Strongest")).toBeDefined();
  });

  test("Should change the percentage of favorites when a hero is added to Favorites", () => {
    
    localStorage.setItem("favorites", JSON.stringify([mockHero]));
      renderHeroStats(mockSumaryData);
      const favoritesPercentageElement = screen.getByTestId('favorite-percentage');
      expect(favoritesPercentageElement.innerHTML).toContain('4.00%');
      const favoritesCountElement = screen.getByTestId('favorite-count');
      expect(favoritesCountElement.innerHTML).toContain('1');
      
    
  });
});
