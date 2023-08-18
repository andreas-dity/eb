import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExampleChart = ({ loanAmount, improvementCost, initialLoanRate, greenLoanRate, freeTerm, annualEnergySavings }) => {
  // Assuming the loan is to be paid off in 25 years
  const years = 26;
  let newLoanAmount = loanAmount;
  let newImprovementCost = improvementCost;

  // Calculate annual cost for each year for both loans
  const data = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    
    let initialAnnualCost = newLoanAmount * initialLoanRate / 100 ;
    let greenAnnualCost = (newLoanAmount + newImprovementCost) * greenLoanRate / 100 ;
    
    if(year === 1){
        greenAnnualCost -= (improvementCost*greenLoanRate/100) * (freeTerm) / 12;
    } 

    greenAnnualCost-= annualEnergySavings;

    newLoanAmount -= loanAmount/25;
    newImprovementCost -= improvementCost/25;

    if(initialAnnualCost<0){
        initialAnnualCost=0;
    }
    if(greenAnnualCost<0){
        greenAnnualCost=0;
    }

    return {
      year: `År ${year}`,
      'Originalt lån': initialAnnualCost,
      'Grønt lån': greenAnnualCost,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Originalt lån" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Grønt lån" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExampleChart;