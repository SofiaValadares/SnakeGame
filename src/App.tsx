import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SnakeThemeProvider } from './context/SnakeThemeContext';
import HomePage from './pages/home/Home';
import GamePage from './pages/game/Game';

function App() {
  return (
    <SnakeThemeProvider>
      <div className="ds-app ds-crt">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SnakeThemeProvider>
  );
}

export default App;
