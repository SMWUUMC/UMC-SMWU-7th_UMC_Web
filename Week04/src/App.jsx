import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchPage from './pages/search';
import CategoryPage from './pages/categories';
import NowPlaying from './pages/now-playing';
import Popular from './pages/popular';
import TopRated from './pages/top-rated';
import UpComing from './pages/up-coming';
import MovieDetail from './pages/movie-details'; // 상세 페이지 컴포넌트

function App() {
  return (
    <div style={{ color: "white", backgroundColor: "black" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="movies/now-playing" element={<NowPlaying />} />
            <Route path="movies/popular" element={<Popular />} />
            <Route path="movies/top-rated" element={<TopRated />} />
            <Route path="movies/up-coming" element={<UpComing />} />
            <Route path="movies/:movieId" element={<MovieDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;