import React, { useState } from 'react';
import './AddEmployeeForm.css';

export function AddEmployeeForm({ onAdd, isMining }) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !role || !department) return;

        onAdd({
            name,
            role,
            department,
            id: "E-" + Math.random().toString(36).substring(2, 9).toUpperCase()
        });

        setName('');
        setRole('');
        setDepartment('');
    };

    return (
        <div className="form-card">
            <div className="form-header">
                <h2>Add Employee Record</h2>
                <p>Create a new immutable record on the blockchain</p>
            </div>

            <form onSubmit={handleSubmit} className="employee-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jane Doe"
                        disabled={isMining}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="role">Job Role</label>
                        <input
                            id="role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Senior Developer"
                            disabled={isMining}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <input
                            id="department"
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Engineering"
                            disabled={isMining}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`btn-primary add-btn ${isMining ? 'mining' : ''}`}
                    disabled={isMining || !name || !role || !department}
                >
                    {isMining ? (
                        <span className="mining-loader">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            Mining Block...
                        </span>
                    ) : (
                        'Add to Blockchain'
                    )}
                </button>
            </form>
        </div>
    );
}
