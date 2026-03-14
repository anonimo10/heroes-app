import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchHerosAction } from "@/heroes/actions/search-heros.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
  const [params] = useSearchParams();
  const name = params.get("name") ?? undefined;
  const strength = params.get("strength") ?? undefined;

  const { data: heroFilter =[]} = useQuery({
    queryKey: ["search", { name,strength }],
    queryFn: () => searchHerosAction({ name,strength }),
    staleTime: 1000 * 60 * 5, //Cinco minutos
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <CustomJumbotrom
        title="Busqueda de SuperHeroes"
        descripcion="Descubre, explora y administra heroes y villanos"
      />
      <CustomBreadcrumbs currentPage="Buscador de Heroes" />
      {/* Stats Dashboard */}
      <HeroStats />

      {/*Filter and Search */}
      <SearchControls />
      {/*  */}
      <HeroGrid heroes={heroFilter} />
    </>
  );
};

export default SearchPage;
