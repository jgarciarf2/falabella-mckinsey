import React from 'react';
import McKinseyMatrix from './components/McKinseyMatrixNew';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <McKinseyMatrix />
      </main>
      <Footer />
    </div>
  );
}

export default App;
