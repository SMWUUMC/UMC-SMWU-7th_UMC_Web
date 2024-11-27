import { useState } from "react";
import Card from "../component/Card/card.jsx";
import { CardList, Pagination } from '../component/Movie/movie.style.js';
import useCustomFetch from "../hooks/useCustomFetch.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1); 
    const [fetchUrl, setFetchUrl] = useState(`/movie/popular?language=ko-KR&page=1`);
    const { data, isLoading, isError } = useCustomFetch(fetchUrl); 

    const totalPages = data?.total_pages || 1; 

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setFetchUrl(`/movie/popular?language=ko-KR&page=${page}`);
        }
    };

    if (isLoading) {
        return <div>
            <h1 style={{ color: 'white' }}>로딩 중...</h1>
        </div>;
    }

    // 에러 상태 처리
    if (isError) {
        return <div>
            <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>
        </div>;
    }

    return (
        <>
            <h2>
                🔥지금 뜨고 있는 영화🔥
            </h2>
            <CardList>
                {data?.results?.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none" }}>
                        <Card movie={movie} />
                    </Link>
                ))}
            </CardList>
            <Pagination>
                <button 
                style = {{height: "40px", width: "70px", 
                    backgroundColor: currentPage === 1 ? "gray" : "red"
                }}
                onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
                <p style={{color:"white"}}>
                    {currentPage} 페이지
                </p>
                <button 
                style = {{height: "40px",width: "70px",
                    backgroundColor: currentPage === totalPages ? "gray" : "red",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer"}}
                onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    다음
                </button>
            </Pagination>

        </>
    );
};

export default HomePage;

