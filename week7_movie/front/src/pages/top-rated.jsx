import Card from "../component/Card/card.jsx";
import * as S from '../component/Movie/movie.style.js';
import { Link } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { axiosInstance } from "../apis/axios-instance";
import CardListSkeleton from "../component/Card/Skeleton/card-list-skeleton.jsx";


const fetchTopRatedMovies = async ({pageParam = 1}) => {
    const { data } = await axiosInstance.get(`/movie/top_rated?page=${pageParam}&language=ko-KR`);
    return data;
};

const TopRated = () => {
    const { data, 
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError } = useInfiniteQuery({
        queryKey: ["TopRatedMovies"],
        queryFn: fetchTopRatedMovies,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage){
                    fetchNextPage();
                }
            },
            {thershold: 1.0}
        );

        if (observerRef.current){
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [fetchNextPage, hasNextPage]);

    if (isLoading) {
        return (
            <S.CardList>
                <CardListSkeleton/>
            </S.CardList>
        );
    }

    if (isError) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>
            </div>
        );
    }

    return (
        <div>
            <S.CardList>
               {data.pages.map((page) => 
                  page.results.map((movie) => (
                      <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none" }}>
                          <Card movie={movie} />
                      </Link>
                   ))   
               )}

              <div ref={observerRef} style={{ height: "1px", backgroundColor: "transparent" }} />
              {isFetchingNextPage && <CardListSkeleton />}
            </S.CardList>
        </div>
    );
}; 

export default TopRated;
