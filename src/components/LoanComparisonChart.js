import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LoanComparisonChart = ({ loanAmount, greenLoanRate, originalLoanRate, improvementCost, annualEnergySavings }) => {
  const loanTerm = 25; // Fixed repayment period of 25 years

  // Yearly loan costs
  const initialCosts = loanAmount * originalLoanRate;
  const greenCosts = (loanAmount + improvementCost) * greenLoanRate - annualEnergySavings;

  // Total loan amount at the start (including improvement cost for green loan)
  let initialTotalLoan = loanAmount;
  let greenTotalLoan = loanAmount + improvementCost;

  // Generate data for each year
  const data = Array.from({ length: loanTerm + 1 }, (_, year) => {
    initialTotalLoan -= initialCosts;
    greenTotalLoan -= greenCosts;

    return {
      year,
      'Initial Loan Remaining': initialTotalLoan < 0 ? 0 : initialTotalLoan,
      'Green Loan Remaining': greenTotalLoan < 0 ? 0 : greenTotalLoan,
    };
  });

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Initial Loan Remaining" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Green Loan Remaining" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LoanComparisonChart;