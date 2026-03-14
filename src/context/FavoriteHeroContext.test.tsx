import { use } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import { test, describe, expect, beforeEach } from "vitest";
import type { Hero } from "@/heroes/type/hero.interface";
const mockHero = {
  id: "1",
  name: "batman",
} as Hero;

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
  beforeEach(() => {
    localStorage.clear();
  });
  test("Should initializate with default values", async () => {
    renderContextTest();
    /* screen.debug(); */
    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("Should add hero to favorite is called with toggleFavorite is called with new Hero", () => {
    renderContextTest();
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
    /* screen.debug(); */
    /*  screen.debug();
    fireEvent.click(button); */
    console.log(localStorage.getItem("favorites"));
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("isFavorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    expect(localStorage.getItem("favorites")).toBe(
      '[{"id":"1","name":"batman"}]',
    );
  });

  test("Should remove hero from favorite when toggleFavorite is called", () => {
    /* localStorage.clear(); */
    localStorage.setItem("favorites", JSON.stringify([mockHero]));
    renderContextTest();
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("isFavorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    /* console.log(screen.queryByTestId("hero-1")); */
   
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
    /* screen.debug(); */
      /*console.log(localStorage.getItem("favorites"));*/
      expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("isFavorite").textContent).toBe("false");
    expect(screen.queryByTestId("hero-1")).toBeNull();
  });
});
