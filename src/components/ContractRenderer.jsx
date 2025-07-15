import React, { useState } from 'react';
import ContractRecursiveRenderer from './ContractRecursiveRenderer';

function ContractRenderer({ contractConfig }) {
  const [mentionState, setMentionState] = useState({});

  const updateMention = (mentionId, newMentionValue) => {
    setMentionState((prevState) => ({ ...prevState, [mentionId]: newMentionValue }));
  };

  const getMention = (mentionConfig) => {
    if (!(mentionConfig.id in mentionState)) {
      setMentionState((prevState) => ({
        ...prevState,
        [mentionConfig.id]: mentionConfig.value || (mentionConfig.children && mentionConfig.children[0]?.text) || '',
      }));
    }
    return mentionState[mentionConfig.id] || mentionConfig.value || (mentionConfig.children && mentionConfig.children[0]?.text) || '';
  };

  return (
    <ContractRecursiveRenderer
      contractConfig={contractConfig}
      getMention={getMention}
      updateMention={updateMention}
    />
  );
}

export default ContractRenderer;
