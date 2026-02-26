import React, { useEffect, useRef } from 'react';
import { BlockCard } from './BlockCard';
import './BlockchainViewer.css';

export function BlockchainViewer({ chain, onTamper, isChainValid }) {
    const containerRef = useRef(null);

    // Auto-scroll to latest block when added
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, [chain.length]);

    return (
        <div className="blockchain-container">
            <div className="blockchain-header">
                <h2>Ledger Viewer</h2>
                <div className={`status-badge ${isChainValid ? 'status-valid' : 'status-invalid'}`}>
                    {isChainValid ? (
                        <><span className="status-dot valid"></span> Chain Intact</>
                    ) : (
                        <><span className="status-dot invalid"></span> Chain Compromised</>
                    )}
                </div>
            </div>

            {!isChainValid && (
                <div className="alert-banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>
                    <div>
                        <strong>Tampering Detected!</strong>
                        <p>One or more blocks have invalid data or broken hash links. The integrity of the ledger is compromised.</p>
                    </div>
                </div>
            )}

            <div className="chain-viewer" ref={containerRef}>
                {chain.map((block, index) => {
                    // Check if this specific block is invalid
                    const recalculatedHash = block.calculateHash();
                    const isBlockHashInvalid = block.hash !== recalculatedHash;

                    // Check if link to previous is invalid
                    let isLinkInvalid = false;
                    if (index > 0) {
                        isLinkInvalid = block.previousHash !== chain[index - 1].hash;
                    }

                    const isInvalid = isBlockHashInvalid || isLinkInvalid;

                    return (
                        <React.Fragment key={block.hash + index}>
                            <BlockCard
                                block={block}
                                isGenesis={index === 0}
                                isInvalid={isInvalid}
                                onTamper={onTamper}
                            />
                            {index < chain.length - 1 && (
                                <div className={`chain-link ${isLinkInvalid ? 'broken' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
