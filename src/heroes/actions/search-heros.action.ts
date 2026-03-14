import {heroApi } from "../api/hero.api";
import type { Hero } from "../type/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;
interface Options{
    name?:string,
    team?:string,
    category?: string,
    universe?: string,
    status?: string,
    strength?: string,   
}
export const searchHerosAction = async (options: Options) => {
  const { name, team, category, universe, status, strength } = options
  
  if (!name && !team && !category && !universe && !status && !strength) {
    return []
    
  }
  const { data} = await heroApi.get<Hero[]>('/heroes/search', {
    params:{name, team, category, universe, status, strength}  
  });

  return data.map((hero) => ({
    ...hero,
    image: `${VITE_API_URL}/images/${hero.image}`,
  }));

}
