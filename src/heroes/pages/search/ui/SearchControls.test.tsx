import { describe, expect, test, vi } from "vitest";
import { SearchControls } from "./SearchControls";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
vi.mock("./ui/SearchControls", () => ({
  SearchControls: () => {
    <div data-testid={"search-controls"}></div>;
  },
}));
if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}
const renderSearchControls = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe("SearchControls", () => {
  test("should render SearchControls with default values", () => {
    renderSearchControls();
  });
  test("should set input value when search params name is set", () => {
    renderSearchControls(["/?name=Batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );
    expect(input.getAttribute("value")).toBe("Batman");
  });
  test("should change params when inputs is changed and enter is pressed", () => {
    renderSearchControls(["/?name=Batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );
    expect(input.getAttribute("value")).toBe("Batman");
    fireEvent.change(input, { target: { value: "Superman" } });
    fireEvent.keyDown(input, { key: "Enter" });
    
    expect(input.getAttribute("value")).toBe("Superman");
  });
  test("should change params strength when slider changed", () => {
    renderSearchControls(["/?name=Batman&search-acordeon=advance-filters"]);
    const slider = screen.getByRole("slider");
    screen.debug(slider);
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
    fireEvent.keyDown(slider,{key: 'ArrowRight'});
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
   
  });
  test('should  accordion be open when active-accordion param is set', () => {
    renderSearchControls(["/?name=Batman&search-acordeon=advance-filters"]);
    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');
    expect(accordionItem);
    expect(accordionItem?.getAttribute('data-state')).toBe('open');
    
  });
  test('should  accordion be open when active-accordion param is not set', () => {
    renderSearchControls(["/?name=Batman"]);
    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');
    expect(accordionItem);
    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    
  });
});
