import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Callback from './pages/Callback';
import Dashboard from './pages/Dashboard';
import { RacingProvider } from './context/RacingContext';

function App() {
  return (
    <BrowserRouter>
      <RacingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </RacingProvider>
    </BrowserRouter>
  );
}

export default App;