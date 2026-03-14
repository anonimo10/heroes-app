
import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.actions";

describe('HeroApi', () => {
    test('should fetch hero data and return with complete image url', async() => {
        const hero = await getHeroAction('bruce-wayne')
    

        expect(hero.image).toContain('http');
        expect(hero).toStrictEqual({
  id: '2',
  name: 'Bruce Wayne',
  slug: 'bruce-wayne',
  alias: 'Batman',
  powers: [
    'Artes marciales',
    'Habilidades de detective',
    'Tecnología avanzada',
    'Sigilo',
    'Genio táctico'
  ],
  description: 'El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.',
  strength: 6,
  intelligence: 10,
  speed: 6,
  durability: 7,
  team: 'Liga de la Justicia',
  image: 'http://localhost:3001/images/2.jpeg',
  firstAppearance: '1939',
  status: 'Active',
  category: 'Hero',
  universe: 'DC'
});
        
    })
    test('should throw an error if hero is not found', async () => {
        const idSlog = 'bruce-wayne2';
       const result = await getHeroAction(idSlog).catch((error) => {
            expect(error).toBeDefined;
            expect(error.message).toBe('Request failed with status code 404');  
       });
        expect(result).toBeUndefined();   
    })
});