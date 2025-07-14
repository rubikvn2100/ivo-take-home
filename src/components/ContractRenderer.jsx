import React from 'react';

function ContractRenderer({
  contractConfig,
  marks = { bold: false, italicized: false, underlined: false },
}) {
  const updatedMarks = {
    bold: marks.bold || !!contractConfig.bold,
    italicized: marks.italicized || !!contractConfig.italic,
    underlined: marks.underlined || !!contractConfig.underline,
  };

  const renderNodes = (nodes) => nodes.map((node, index) => (
    <ContractRenderer
      key={node.id || `${node.type || 'node'}-${index}`}
      contractConfig={node}
      marks={updatedMarks}
    />
  ));

  if (Array.isArray(contractConfig)) {
    return <div>{renderNodes(contractConfig)}</div>;
  }

  const getStyles = (node) => ({
    fontWeight: updatedMarks.bold ? 'bold' : 'normal',
    fontStyle: updatedMarks.italicized ? 'italic' : 'normal',
    textDecoration: updatedMarks.underlined ? 'underline' : 'none',
  });

  if ('text' in contractConfig) {
    if (!contractConfig.text.includes('\n')) {
      return <span style={getStyles(contractConfig)}>{contractConfig.text}</span>;
    }

    const lines = contractConfig.text.split('\n');
    return lines.map((line, index) => (
      <span
        key={`line-${contractConfig.id || contractConfig.type || 'text'}`}
        style={{ ...getStyles(contractConfig) }}
      >
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
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
