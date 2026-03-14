import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { fireEvent, render,screen} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{ children}</button>
    )
    
}));
const renderWithRouter = (component: React.ReactElement,initialsEntries?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialsEntries}>
            {component}
        </MemoryRouter>
    )
}
describe('CustomPagination', () => {
    test('shoulder render component with default values', () => {
        renderWithRouter(<CustomPagination totalPages={5} />);
        expect(screen.getByText('Anteriores')).toBeDefined();
        expect(screen.getByText('Siguientes')).toBeDefined();
        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
        /* screen.debug(); */
        
    });
    
    
    test('should disabled previous button when page is 1', () => {
        renderWithRouter(<CustomPagination totalPages={5} />);
        const previousButton = screen.getByText('Anteriores');
        expect(previousButton.getAttributeNames()).toContain('disabled');         
    });
    test('should disabled next button when are in the  page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />,['/?page=5']);
        const nextButton = screen.getByText('Siguientes');
        /* screen.debug(nextButton); */
        expect(nextButton.getAttributeNames()).toContain('disabled');  
    });

    test('should disabled next button when are in the  page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />,['/?page=3']);
        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');
        /* screen.debug(button2);
        screen.debug(button3); */
        expect(button2.getAttribute('variant')).toBe('outline');  
        expect(button3.getAttribute('variant')).toBe('default');  
    });
     test('should change page when click on number button', () => {
        renderWithRouter(<CustomPagination totalPages={5} />,['/?page=3']);
         const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');
        /* screen.debug(button2);
        screen.debug(button3); */
        expect(button2.getAttribute('variant')).toBe('outline');  
         expect(button3.getAttribute('variant')).toBe('default');  
         fireEvent.click(button2);
         expect(button2.getAttribute('variant')).toBe('default');  
          expect(button3.getAttribute('variant')).toBe('outline');  
    });
});