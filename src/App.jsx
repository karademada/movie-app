// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DetailsPage from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import './index.css'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;