import React, { useState } from 'react';
import './EmployeeVerifier.css';

export function EmployeeVerifier({ chain, onClose }) {
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!searchId) return;

        // Search through the blockchain (skip genesis block)
        const foundBlock = chain.slice(1).find(
            block => block.data && (block.data.address === searchId || block.data.id === searchId)
        );

        setSearchResult(foundBlock ? foundBlock.data : null);
        setHasSearched(true);
    };

    return (
        <div className="verifier-modal">
            <div className="verifier-content">
                <div className="verifier-header">
                    <h2>Verify Employee Record</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="verifier-body">
                    <p className="verifier-description">
                        Enter an Employee Address or ID to cryptographically verify their presence on the NeoLedger blockchain.
                    </p>

                    <form onSubmit={handleVerify} className="verify-form">
                        <div className="search-group">
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => {
                                    setSearchId(e.target.value);
                                    setHasSearched(false);
                                }}
                                placeholder="Enter Employee Address or ID..."
                                className="search-input"
                            />
                            <button type="submit" className="btn-primary search-btn">
                                Verify
                            </button>
                        </div>
                    </form>

                    {hasSearched && (
                        <div className={`verify-result ${searchResult ? 'success' : 'failed'}`}>
                            {searchResult ? (
                                <div className="result-card">
                                    <div className="result-status">
                                        <span className="status-icon">✓</span>
                                        <strong>Verified: Record Found</strong>
                                    </div>
                                    <div className="result-details">
                                        <div className="detail-row">
                                            <span className="detail-label">ID:</span>
                                            <span className="detail-value mono">{searchResult.id}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Name:</span>
                                            <span className="detail-value font-bold">{searchResult.name}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Role:</span>
                                            <span className="detail-value">{searchResult.role}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Department:</span>
                                            <span className="detail-value dept-badge">{searchResult.department}</span>
                                        </div>
                                        {searchResult.address && (
                                            <div className="detail-row">
                                                <span className="detail-label">Address:</span>
                                                <span className="detail-value mono" style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>{searchResult.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="result-error">
                                    <span className="status-icon">✗</span>
                                    <strong>Verification Failed</strong>
                                    <p>No valid employee record found for: <span className="mono">{searchId}</span></p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
