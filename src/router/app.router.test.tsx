import { describe, expect, test, vi } from "vitest";
import { AppRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";

vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="hero-page"></div>,
}));
vi.mock("@/heroes/layouts/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="home-page">
      <Outlet />
    </div>
  ),
}));

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug = "" } = useParams();
    return <div data-testid="hero-page">Heropage-{idSlug}</div>;
  },
}));
vi.mock('@/heroes/pages/search/searchPage', () => ({
    default: () => <div data-testid="search-page">
        
    </div>
}));

describe("AppRouter", () => {
  test("should be configured as expected", () => {
    expect(AppRouter.routes).toMatchSnapshot();
  });
  test("should render home page at root path", () => {
    const router = createMemoryRouter(AppRouter.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeDefined();
    /* screen.debug();  */
  });
  test("should render home page at /heroes/:idSlug path ", () => {
    const router = createMemoryRouter(AppRouter.routes, {
      initialEntries: ["/heroes/superman"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("hero-page").innerHTML).toContain("superman");
    /* screen.debug();  */
});

test('should render search page at /search path', async() => {
    const router = createMemoryRouter(AppRouter.routes, {
        initialEntries: ["/search"],
    });
    render(<RouterProvider router={router} />);
    expect(await screen.findByTestId('search-page')).toBeDefined();
 
});
    
    test('should rendirect to home page for unkmown routes',() => {
    const router = createMemoryRouter(AppRouter.routes, {
        initialEntries: ["/otra-pagina-rara"],
    });
    render(<RouterProvider router={router} />);
         expect(screen.findByTestId('home-page')).toBeDefined();
        screen.debug();
 
    });
});
