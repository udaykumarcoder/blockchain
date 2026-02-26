import React, { useState } from 'react';
import './BlockCard.css';

export function BlockCard({ block, isGenesis, isInvalid, onTamper }) {
    const [tamperData, setTamperData] = useState(JSON.stringify(block.data, null, 2));
    const [originalData] = useState(JSON.stringify(block.data, null, 2)); // preserve original
    const [isEditing, setIsEditing] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const handleTamper = () => {
        try {
            // Allow raw string or JSON input for tampering
            let dataToSet = tamperData;
            try {
                dataToSet = JSON.parse(tamperData);
            } catch (e) {
                // If not JSON, leave as string
            }
            onTamper(block.hash, dataToSet);
            setIsEditing(false);
            setShowComparison(true); // show original vs tampered
        } catch (error) {
            console.error("Invalid tamper data");
        }
    };

    return (
        <div className={`block-card ${isInvalid ? 'invalid' : ''} ${isGenesis ? 'genesis' : ''}`}>
            <div className="block-header">
                <span className="block-index">Block #{isGenesis ? 0 : '...'}</span>
                {isGenesis && <span className="badge genesis-badge">Genesis Block</span>}
                {isInvalid && <span className="badge invalid-badge">Invalid Block</span>}
            </div>

            <div className="block-body">
                <div className="data-group">
                    <label>Timestamp:</label>
                    <span className="mono">{new Date(block.timestamp).toLocaleString()}</span>
                </div>

                <div className="data-group">
                    <label>Data:</label>
                    {isEditing && !isGenesis ? (
                        <div className="tamper-edit">
                            <textarea
                                value={tamperData}
                                onChange={(e) => setTamperData(e.target.value)}
                                className="tamper-textarea"
                            />
                            <button className="btn-small tamper-btn-confirm" onClick={handleTamper}>Apply Tamper</button>
                            <button className="btn-small cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <pre className="data-preview">{JSON.stringify(block.data, null, 2)}</pre>
                    )}
                </div>

                <div className="data-group hash-group">
                    <label>Previous Hash:</label>
                    <span className="mono hash truncate" title={block.previousHash}>{block.previousHash}</span>
                </div>

                <div className="data-group hash-group">
                    <label>Hash:</label>
                    <span className="mono hash truncate" title={block.hash}>{block.hash}</span>
                </div>
                <div className="data-group">
                    <label>Nonce:</label>
                    <span className="mono">{block.nonce}</span>
                </div>
            </div>

            {/* Show original vs tampered data after tampering */}
            {showComparison && (
                <div className="tamper-comparison">
                    <div className="original-data">
                        <h4>Original Data</h4>
                        <pre className="data-preview">{originalData}</pre>
                    </div>
                    <div className="tampered-data">
                        <h4>Tampered Data</h4>
                        <pre className="data-preview">{JSON.stringify(block.data, null, 2)}</pre>
                    </div>
                </div>
            )}

            {!isGenesis && !isEditing && (
                <div className="block-footer">
                    <button className="btn-secondary tamper-btn" onClick={() => setIsEditing(true)}>Tamper Data</button>
                </div>
            )}
        </div>
    );
}
