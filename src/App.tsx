import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import PostView from './pages/PostView';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/post/:slug" element={<PostView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
