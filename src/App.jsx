import React, { useState, useEffect } from 'react';
import { Blockchain } from './blockchain/Blockchain';
import { Block } from './blockchain/Block';
import { AddEmployeeForm } from './components/AddEmployeeForm';
import { BlockchainViewer } from './components/BlockchainViewer';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeVerifier } from './components/EmployeeVerifier';
import './App.css';

function App() {
  const [employeeChain, setEmployeeChain] = useState(new Blockchain());
  const [chainValid, setChainValid] = useState(true);
  const [isMining, setIsMining] = useState(false);
  const [triggerRender, setTriggerRender] = useState(0);
  const [showList, setShowList] = useState(false);
  const [showVerifier, setShowVerifier] = useState(false);

  // Initial render validation check
  useEffect(() => {
    setChainValid(employeeChain.isChainValid());
  }, [triggerRender, employeeChain]);

  const handleAddEmployee = (employeeData) => {
    setIsMining(true);

    // Simulate mining delay so user can see it processing
    setTimeout(() => {
      try {
        const newBlock = new Block(Date.now(), employeeData);
        employeeChain.addBlock(newBlock);

        // Update state to trigger re-render properly by creating a cloned instance
        const newChain = new Blockchain();
        newChain.chain = [...employeeChain.chain];
        newChain.difficulty = employeeChain.difficulty;

        setEmployeeChain(newChain);
        setChainValid(newChain.isChainValid());
      } catch (err) {
        console.error("Mining error:", err);
      } finally {
        setIsMining(false);
        setTriggerRender(prev => prev + 1);
      }
    }, 1000); // 1 second artificial delay
  };

  const handleTamper = (hashToTamper, newData) => {
    // Find block by hash
    const blockIndex = employeeChain.chain.findIndex(b => b.hash === hashToTamper);

    if (blockIndex !== -1) {
      // Modify the block data, which simulates tampering.
      // We intentionally DO NOT update the hash. By altering the data but keeping 
      // the original hash, this specific block's hash check will immediately fail, 
      // displaying clearly that THIS block is invalid.
      employeeChain.chain[blockIndex].data = newData;

      // Trigger re-render to show invalidation
      setChainValid(employeeChain.isChainValid());
      setTriggerRender(prev => prev + 1);
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <header className="app-header">
        <h1>
          <span className="gradient-text">Neo</span>Ledger
        </h1>
        <p className="subtitle">Immutable Employee Records via Blockchain</p>
      </header>

      <main className="app-main">
        <section className="input-section">
          <div className="input-container">
            <AddEmployeeForm onAdd={handleAddEmployee} isMining={isMining} />
            <div className="actions-row">
              <button
                className="btn-secondary view-list-btn"
                onClick={() => setShowList(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                View Employee Directory ({employeeChain.chain.length - 1})
              </button>
              <button
                className="btn-secondary view-list-btn"
                onClick={() => setShowVerifier(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Verify Employee
              </button>
            </div>
          </div>

          <div className="instructions-card">
            <h3>How it works</h3>
            <ol>
              <li><strong>Add Data:</strong> Enter employee details to mine a new block.</li>
              <li><strong>Hash Linking:</strong> Each new block securely links to the previous block's hash.</li>
              <li><strong>Tamper Testing:</strong> Try modifying the data inside an existing block. Watch how it immediately invalidates the entire chain!</li>
            </ol>
          </div>
        </section>

        <section className="viewer-section">
          <BlockchainViewer
            chain={employeeChain.chain}
            onTamper={handleTamper}
            isChainValid={chainValid}
          />
        </section>
      </main>

      {showList && (
        <EmployeeList
          chain={employeeChain.chain}
          onClose={() => setShowList(false)}
        />
      )}
      {showVerifier && (
        <EmployeeVerifier
          chain={employeeChain.chain}
          onClose={() => setShowVerifier(false)}
        />
      )}
    </div>
  );
}

export default App;
