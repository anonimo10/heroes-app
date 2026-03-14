import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";
  const queryLimit = searchParams.get("limit") ?? "6";
  /* const limit = isNaN(+queryLimit) ? 6 : +queryLimit; */
  const page = isNaN(+queryPage) ? 1 : +queryPage;
  const limits = [10, 30, 50, 100];
  const parsedLimit = Number(queryLimit);
  const limit = limits.includes(parsedLimit) ? parsedLimit : 6;
  const handleLimitChange = (newLimit: number) => {
    setSearchParams((prev) => {
      prev.set("limit", newLimit.toString());
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground dark:text-gray-400">
            Filas:
          </span>

          <select
            value={limit}
            className="h-7 w-16.25 text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 text-gray-700 dark:text-gray-200 outline-none focus:ring-1 focus:ring-gray-400"
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            {limits.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Anteriores
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={page === index + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Siguientes
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
