import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSumary = () => {
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
      staleTime: 1000 * 60 * 5, //Cinco minutos
    placeholderData: keepPreviousData,
  });
  
};
