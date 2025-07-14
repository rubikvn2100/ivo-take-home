import React from 'react';
import ContractRecursiveRenderer from './ContractRecursiveRenderer';

function ContractRenderer({ contractConfig }) {
  return (
    <ContractRecursiveRenderer
      contractConfig={contractConfig}
    />
  );
}

export default ContractRenderer;
