import React, { useState } from 'react';
import './EnergyCalculator.css';
import ExampleChart from './ExampleChart';
import ExampleChart2 from './ExampleChart2';
import logo from './eb-prosjekt.png';
import LoanComparisonChart from './LoanComparisonChart';

const EnergyCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(4000000);
  const [improvementCost, setImprovementCost] = useState(500000);
  const [initialLoanRate, setInitialLoanRate] = useState(5.5);
  const [greenLoanRate, setGreenLoanRate] = useState(4.5);
  const [freeTerm, setFreeTerm] = useState(3);
  const [loanTerm, setLoanTerm] = useState(25);
  const [results, setResults] = useState(null);


  const handleCalculation = () => {
    
    const numLoanAmount = Number(loanAmount);
    const numImprovementCost = Number(improvementCost);
    const numInitialLoanRate = Number(initialLoanRate);
    const numGreenLoanRate = Number(greenLoanRate);
    const estimatedEnergySavings = estimateEnergySavings(numImprovementCost);

    
    if (
      numLoanAmount > 0 &&
      numImprovementCost > 0 &&
      numInitialLoanRate > 0 &&
      numGreenLoanRate > 0
    ) {
      const initialAnnualLoanCost = numLoanAmount * numInitialLoanRate / 100;
      
      const initialLoanCostTotal = initialAnnualLoanCost * loanTerm;
  
      const newLoanAmount = numLoanAmount + numImprovementCost;
      const newAnnualLoanCost = newLoanAmount * numGreenLoanRate / 100;
      const newLoanCostTotal = newAnnualLoanCost * loanTerm;
      
  
      // Calculate annual interest savings
      const annualInterestSavings = Math.floor(initialAnnualLoanCost - newAnnualLoanCost);
  
      const yearsToPayOff = Math.floor(numImprovementCost / (annualInterestSavings+estimatedEnergySavings));
  
      setResults({
        annualInterestSavings, 
        yearsToPayOff, 
        initialAnnualLoanCost, 
        newAnnualLoanCost, 
        initialLoanCostTotal, 
        newLoanCostTotal, 
        estimatedEnergySavings 
      });
    } else {
      alert("Vennligst fyll ut alle feltene");
    }
  };
 
  // Estimate annual energy savings based on the cost of energy efficiency improvements.
  // For simplicity, we assume that each 100 kr spent results in 1 kr in annual savings.
  const estimateEnergySavings = (improvementCost) => {
    return improvementCost * 2 / 100;
  };
  

  const setDefaultValues = () => {
    setLoanAmount(4000000);
    setImprovementCost(500000);
    setInitialLoanRate(5.5);
    setGreenLoanRate(4.5);
    setFreeTerm(3);
  };

    //LOG TILNÆRMING FOR BOLIGLÅN
  const minLog = Math.log10(100);    // Antatt laveste verdi er 1
  const maxLog = Math.log10(10000); // Maksverdien som før
  
  function interpolate(value) {
      return minLog + (maxLog - minLog) * (value / 100);
  }
  
  function sliderValueFromActual(value) {
      const logValue = Math.log10(value);
      const scaledValue = ((logValue - minLog) / (maxLog - minLog)) * 100;
      return Math.min(100, Math.max(0, scaledValue));  // Sikrer at verdien ligger mellom 0 og 100
  }
  
  function sliderToActual(value) {
      const actualValue = Math.pow(10, interpolate(value));
      return Math.round(actualValue); // Avrunder til nærmeste hele tall
  }

  //LOG TILNÆRMING FOR TILTAK
  const minLogImprovement = Math.log10(1);    
const maxLogImprovement = Math.log10(1500); 

function interpolateImprovement(value) {
    return minLogImprovement + (maxLogImprovement - minLogImprovement) * (value / 100);
}

function sliderValueFromActualImprovement(value) {
    const logValue = Math.log10(value);
    const scaledValue = ((logValue - minLogImprovement) / (maxLogImprovement - minLogImprovement)) * 100;
    return Math.min(100, Math.max(0, scaledValue));  
}

function sliderToActualImprovement(value) {
    const actualValue = Math.pow(10, interpolateImprovement(value));
    return Math.round(actualValue); 
}

  

  console.log(results)
  return (
    <div className="grid-container">
      {!results && (
        <div className={`logo-container ${results ? 'logo-transition' : ''}`}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      )}
      <div className={`calculator ${results ? 'calculator-transition' : ''}`}>
      <h2>Lønnsomhetskalkulator</h2>
        <p>Beregn dine energibesparelser og tilbakebetalingstid etter å ha gjort grønne forbedringer</p>
        <div className="button-container">
  <button className="button" onClick={handleCalculation}>Beregn</button>
  <button className="button" onClick={setDefaultValues}>Sett standardverdier</button>
</div>
        <p>Boliglån: {loanAmount.toLocaleString('no-NB')} kr</p>
        <input type="number" className="input-field" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
        <input 
    type="range" 
    min="0" 
    max="100" 
    step="1"
    className="slider" 
    value={sliderValueFromActual(loanAmount / 1000)} 
    onChange={e => {
        const actualValue = sliderToActual(e.target.value) * 1000;
        setLoanAmount(actualValue);
    }} 
/>

        <p>Ekstra lån for tiltak: {improvementCost.toLocaleString('no-NB')} kr</p>
        <input type="number" className="input-field" value={improvementCost} onChange={e => setImprovementCost(e.target.value)} />
        <input 
    type="range" 
    min="0" 
    max="100" 
    step="1"
    className="slider" 
    value={sliderValueFromActualImprovement(improvementCost / 1000)} 
    onChange={e => {
        const actualValue = sliderToActualImprovement(e.target.value) * 1000;
        setImprovementCost(actualValue);
    }} 
/>
        <p>Opprinnelig lånerente: {initialLoanRate} %</p>
        <input type="number" className="input-field" value={initialLoanRate} onChange={e => setInitialLoanRate(e.target.value)} />
        <input type="range" min="0" max="100" className="slider" value={initialLoanRate*10} onChange={e => setInitialLoanRate(e.target.value/10)} />
        <p>Grønn lånerente: {greenLoanRate} %</p>
        <input type="number" className="input-field" value={greenLoanRate} onChange={e => setGreenLoanRate(e.target.value)} />
        <input type="range" min="0" max="100" className="slider" value={greenLoanRate*10} onChange={e => setGreenLoanRate(e.target.value/10)} />
        <p>Rentefri periode for tiltakslån: {freeTerm} måneder</p>
        <input type="number" className="input-field" value={freeTerm} onChange={e => setFreeTerm(e.target.value)} />
        <input type="range" min="0" max="12" className="slider" value={freeTerm} onChange={e => setFreeTerm(e.target.value)} />
      </div>
      {results && (
        <div className={`chart ${results ? 'chart-transition' : ''}`}>
          {results && (
  <div className="results-container">
   <p className="result">Initiell årlig rentebesparelse: <span>{results.annualInterestSavings.toLocaleString('no-NB')}</span> kr</p>
<p className="result">Estimert årlige strømbesparelser: <span>{results.estimatedEnergySavings.toLocaleString('no-NB')}</span> kr</p>
<p className="result">Tiltak er betalt ned etter <span>{results.yearsToPayOff.toLocaleString('no-NB')}</span> år</p>
  </div>
)}

<h2>Aggregert kostnad</h2>
<p>Inkludert strømbesparelse</p>
          <ExampleChart2
            loanAmount={Number(loanAmount)}
            improvementCost={Number(improvementCost)}
            initialLoanRate={Number(initialLoanRate)}
            greenLoanRate={Number(greenLoanRate)}
            freeTerm={Number(freeTerm)}
            annualEnergySavings={results.estimatedEnergySavings}
          />

<h2>Årlig kostnad</h2>
<p>Inkludert strømbesparelse</p>
          <ExampleChart
            loanAmount={Number(loanAmount)}
            improvementCost={Number(improvementCost)}
            initialLoanRate={Number(initialLoanRate)}
            greenLoanRate={Number(greenLoanRate)}
            freeTerm={Number(freeTerm)}
            annualEnergySavings={results.estimatedEnergySavings}
          />
                   

          <div>
            <p>Besparelsen er beregnet ved å ta din opprinnelige årlige lånekostnad ({results.initialAnnualLoanCost.toLocaleString('no-NB')} kr) og trekke fra den nye årlige lånekostnaden ({results.newAnnualLoanCost.toLocaleString('no-NB')} kr). Besparelsen på strøm ({results.estimatedEnergySavings.toLocaleString('no-NB')} kr) anvendes deretter til å betale ned lån i scenario med grønt lån. Boliglånet er et serielån som betales ned over 25 år. Kalkulatoren tar forbehold om strømbesparelse på 2 kr per 100kr brukt på tiltak, og tiltakslånerente lik grønn lånerente.</p>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default EnergyCalculator;

/*

 <LoanComparisonChart
    loanAmount={Number(loanAmount)}
    improvementCost={Number(improvementCost)}
    greenLoanRate={Number(greenLoanRate)} 
    originalLoanRate={Number(initialLoanRate)}
    annualEnergySavings={results.estimatedEnergySavings}
    freeTerm={Number(freeTerm)}

  />*/