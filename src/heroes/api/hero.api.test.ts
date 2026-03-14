
import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;
describe('HeroApi', () => {    
    test('should be configure pointing to the testing server', () => {
        /* Verficamos que el Hero exista */
        expect(heroApi).toBeDefined();
        /* Esto asegura que la URL este bien configurado */
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api`);
        /* Que el servidor sea el de testing */
        expect(BASE_URL).toContain('3001');
    });
}
    
);