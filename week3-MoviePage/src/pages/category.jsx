import styled from "styled-components";
import CategoryButton from "../components/categorybutton";

const CategoryPage = () => {
    return (
        <>
            <h1>카테고리</h1>
            <CategoryList>
                <CategoryButton value='현재 상영중인' 
                to='/movies/now-playing' seed='1'/>
                <CategoryButton value='인기있는'
                to='/movies/popular' seed='2'/>
                <CategoryButton value='높은 평가를 받은' 
                to='/movies/top-rated' seed='3'/>
                <CategoryButton value='개봉 예정중인'
                to='/movies/up-coming' seed='4'/>
            </CategoryList>
        </>
    );
}

const CategoryList = styled.ul`
    width: 90%;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

export default CategoryPage