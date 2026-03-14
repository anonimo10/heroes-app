import { heroApi } from "../api/hero.api"
import type { Hero } from "../type/hero.interface"
const VITE_API_URL = import.meta.env.VITE_API_URL;
export const getHeroAction = async (slug:string) => {
     const {data}= await heroApi.get<Hero>(`/heroes/${slug}`)

    return {
        ...data,
        image: `${VITE_API_URL}/images/${data.image}`
  }
}

