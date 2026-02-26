import React from 'react';
import './EmployeeList.css';

export function EmployeeList({ chain, onClose }) {
    // Extract employee data, skipping genesis block
    const employees = chain.slice(1).map(block => block.data);

    return (
        <div className="employee-list-modal">
            <div className="employee-list-content">
                <div className="employee-list-header">
                    <h2>Employee Directory</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {employees.length === 0 ? (
                    <p className="no-data">No employees added to the blockchain yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp, index) => (
                                    <tr key={emp.id || index}>
                                        <td className="mono">{emp.id}</td>
                                        <td><strong>{emp.name}</strong></td>
                                        <td>{emp.role}</td>
                                        <td>
                                            <span className="dept-badge">{emp.department}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
