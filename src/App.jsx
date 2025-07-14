import React from 'react';
import ContractRenderer from './components/ContractRenderer';
import contractConfig from './input.json';

function App() {
  return (
    <ContractRenderer contractConfig={contractConfig} />
  );
}

export default App;
