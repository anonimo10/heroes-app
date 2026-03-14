
import { heroApi } from '../api/hero.api';
import type { HeroesResponse } from "../type/get-heroes.response";
const VITE_API_URL = import.meta.env.VITE_API_URL;
export const getHeroesByPageAction = async (
    page: number,
    limit: number = 6,
    category: string ='all',
    
): Promise<HeroesResponse> => {
    if (isNaN(page)) {
        page = 1
    }
    if (isNaN(limit)) {
        limit=6        
    }
    const { data } = await heroApi.get<HeroesResponse>(`/heroes`, {
        
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category:category,
        }
    });
    const heroes = data.heroes.map((hero) => ({  
        ...hero,
       image: `${VITE_API_URL}/images/${hero.image}`        
    }));  
    return {
        ...data,
        heroes: heroes       
    }  
}
