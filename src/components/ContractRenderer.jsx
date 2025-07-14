import React from 'react';

function ContractRenderer({ contractConfig }) {
  if ('text' in contractConfig) {
    return <p>{contractConfig.text}</p>;
  }

  const renderNodes = (nodes) => nodes.map((node, index) => (
    <ContractRenderer
      key={node.id || `${node.type || 'node'}-${index}`}
      contractConfig={node}
    />
  ));

  if (Array.isArray(contractConfig)) {
    return <div>{renderNodes(contractConfig)}</div>;
  }

  const children = contractConfig.children ? renderNodes(contractConfig.children) : null;

  return children;
}

export default ContractRenderer;
