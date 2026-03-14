import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import { heroApi } from '../api/hero.api';

const BASE_URL = import. meta.env.VITE_API_URL;
describe('getHeroesByPageAction', () => {
    const heroApiMock = new AxiosMockAdapter(heroApi)
    beforeEach(() => {
        heroApiMock.reset();
    });
    test('Should return default heroes', async () => {
        heroApiMock.onGet('/heroes').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image:'1.jpg'
                },
                {
                    image:'2.jpg'
                }
                
                
            ]
        });
        const hero = await getHeroesByPageAction(1);
        expect(hero).toStrictEqual({
  total: 10,
  pages: 2,
  heroes: [
    { image: `${BASE_URL}/images/1.jpg` },
    { image: `${BASE_URL}/images/2.jpg` }
  ]
});
        
    })


    test('Should return the correct heroes when page is not a number', async() => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        heroApiMock.onGet('/heroes').reply(200, responseObject);
        heroApiMock.resetHistory();

        await getHeroesByPageAction('ABC' as unknown as number);
        const params = heroApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' });
        expect(heroApiMock.history.get.length).toBe(1);
    })
    
    test('Should return the correct heroes when page is string number', async() => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        heroApiMock.onGet('/heroes').reply(200, responseObject);
        heroApiMock.resetHistory();

        await getHeroesByPageAction('5' as unknown as number);
        const params = heroApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 6, offset: 24, category: 'all' });
        expect(heroApiMock.history.get.length).toBe(1);
    })
    
    test('Should call the api with correct params', async() => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        heroApiMock.onGet('/heroes').reply(200, responseObject);
        heroApiMock.resetHistory();

        await getHeroesByPageAction(2,10,'heroes');
        const params = heroApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'heroes' });
        /* expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' }); */
      
    })
});