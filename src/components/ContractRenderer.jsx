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

  switch (contractConfig.type) {
    case 'clause':
      return (
        <div className="clause" style={getStyles(contractConfig)}>
          {children}
        </div>
      );
    case 'mention':
      return (
        <span
          className="mention"
          style={{ ...getStyles(contractConfig), backgroundColor: contractConfig.color }}
          title={contractConfig.title}
        >
          {contractConfig.value || (contractConfig.children && contractConfig.children[0]?.text)}
        </span>
      );
    case 'block':
      return <div style={getStyles(contractConfig)}>{children}</div>;
    case 'p':
      return <p style={getStyles(contractConfig)}>{children}</p>;
    case 'h1':
      return <h1 style={getStyles(contractConfig)}>{children}</h1>;
    case 'h2':
      return <h2 style={getStyles(contractConfig)}>{children}</h2>;
    case 'h3':
      return <h3 style={getStyles(contractConfig)}>{children}</h3>;
    case 'h4':
      return <h4 style={getStyles(contractConfig)}>{children}</h4>;
    case 'ul':
      return <ul style={getStyles(contractConfig)}>{children}</ul>;
    case 'li':
      return <li style={getStyles(contractConfig)}>{children}</li>;
    case 'lic':
      return <li style={getStyles(contractConfig)}>{children}</li>;
    default:
      return <div style={getStyles(contractConfig)}>{children}</div>;
  }
}

export default ContractRenderer;
