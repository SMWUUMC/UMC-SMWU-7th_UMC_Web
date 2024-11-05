import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import HomePage from './pages/home';
import MoviesPage from './pages/movies';
import SearchPage from './pages/search';
import NowPlayingPage from './pages/now-playing';
import PopularPage from './pages/popular';
import TopRatedPage from './pages/top-rated';
import UpComingPage from './pages/up-coming';
import RootLayout from './components/root-layout';
import styled from 'styled-components';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/now-playing" element={<NowPlayingPage />} />
          <Route path="movies/popular" element={<PopularPage />} />
          <Route path="movies/top-rated" element={<TopRatedPage />} />
          <Route path="movies/up-coming" element={<UpComingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
