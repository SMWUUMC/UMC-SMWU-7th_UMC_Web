import './search.css';

const SearchPage = () => {
    return (
        <div className="searchBox">
            <input className="searchInput" type={'text'} placeholder='영화 제목을 검색해보세요' />
            <button className="searchBtn">검색</button>
        </div>
    );
};

export default SearchPage;