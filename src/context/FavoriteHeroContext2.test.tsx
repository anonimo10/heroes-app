import { use } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import { test, describe, expect, vi, beforeEach } from "vitest";
import type { Hero } from "@/heroes/type/hero.interface";
const mockHero = {
  id: "1",
  name: "batman",
} as Hero;

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);
  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>
      <button
        data-testid="toggle-favorite"
        onClick={() => {
          toggleFavorite(mockHero);
        }}
      >
        Toggle Favorite
      </button>

      <div data-testid="isFavorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};
const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );
};
describe("FavoriteHeroProvider", () => {
  /* console.log(localStorage); */
  test("Should initializate with default values", async () => {
    renderContextTest();
    screen.debug();
    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("Should add hero to favorite is called with toggleFavorite is called with new Hero", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    })
    renderContextTest();
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
    
    console.log(localStorage.getItem("favorites"));
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("isFavorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites',"[{\"id\":\"1\",\"name\":\"batman\"}]");
   
  });

  test("Should remove hero from favorite when toggleFavorite is called", () => {
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));
    renderContextTest();
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("isFavorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
  
   
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
   
      expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("isFavorite").textContent).toBe("false");
    expect(screen.queryByTestId("hero-1")).toBeNull();
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites",'[]');
  });
});
