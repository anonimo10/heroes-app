import { use, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useHeroSumary } from "@/heroes/hooks/useHeroSumary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginateHero";
import { FavoriteHeroContext } from "@/context/FavoriteHeroContext";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";
  const selectTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSumary();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotrom
          title="SuperHero Universe"
          descripcion="Descover, explore, and manage your superheroes and villians"
        />
        <CustomBreadcrumbs currentPage="Super Heroes" />
        {/* Stats Dashboard */}
        <HeroStats />
        {/* Controls */}
        {/* Advanced Filters */}
        {/* Tabs */}
        <Tabs value={selectTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");

                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  prev.set("category", "favorites");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <h1>todos los personajes</h1>
            {/* Character Grid */}
            <HeroGrid heroes={heroResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />
            {/* Character Grid */}
          </TabsContent>
          <TabsContent value="heroes">
            <h1>todos los personajes Heroes</h1>
            {/* Character Grid */}
            {/*  <HeroGrid heroes={[]} /> */}
            <HeroGrid heroes={heroResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>todos los personajes villains</h1>
            {/* Character Grid */}
            {/*  <HeroGrid heroes={[]} /> */}
            <HeroGrid heroes={heroResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroResponse?.pages ?? 1} />
      </>
    </>
  );
};
