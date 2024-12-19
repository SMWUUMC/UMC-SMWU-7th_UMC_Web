import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetMovies } from "./useGetMovies.js";

function useGetInfiniteMovies(category) {
  return useInfiniteQuery({
    queryKey: ["movies", category],
    queryFn: ({ pageParam }) => useGetMovies({ category, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.at(-1)
        ? allPages?.length + 1 // 다음 페이지 번호 반환
        : undefined; // 더 이상 로드할 페이지가 없으면 undefined 반환
    },
  });
}

export { useGetInfiniteMovies };
