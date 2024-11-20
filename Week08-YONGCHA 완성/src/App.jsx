import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import HomePage from './pages/home';
import MoviesPage from './pages/movies';
import SearchPage from './pages/search';
import NowPlayingPage from './pages/now-playing';
import PopularPage from './pages/popular';
import TopRatedPage from './pages/top-rated';
import UpComingPage from './pages/up-coming';
import MovieDetailPage from './pages/moviedetails';
import RootLayout from './components/root-layout';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
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
              <Route path="movies/:movieId" element={<MovieDetailPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;