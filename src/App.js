import './App.css';
import React from 'react';
import EnergyCalculator from './components/EnergyCalculator';
import banner from './banner.png';
import footer from './footer.png';

function App() {
  return (
    <div className="App">
    <img src={banner} className="App-banner" alt="banner" />
    <main>
      <EnergyCalculator />
      <img src={footer} className="App-footer" alt="footer" />
    </main>
  </div>
  );
}

export default App;