import React from 'react';

function ContractRenderer({ contractConfig }) {
  const renderNodes = (nodes) => nodes.map((node, index) => (
    <ContractRenderer
      key={node.id || `${node.type || 'node'}-${index}`}
      contractConfig={node}
    />
  ));

  if (Array.isArray(contractConfig)) {
    return <div>{renderNodes(contractConfig)}</div>;
  }

  const getStyles = (node) => ({
    fontWeight: node.bold ? 'bold' : 'normal',
    textDecoration: node.underline ? 'underline' : 'none',
  });

  if ('text' in contractConfig) {
    return <p style={getStyles(contractConfig)}>{contractConfig.text}</p>;
  }

  const children = contractConfig.children ? renderNodes(contractConfig.children) : null;

  return children;
}

export default ContractRenderer;
