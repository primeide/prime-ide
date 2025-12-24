'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    propertyName?: string;
    location?: string;
    requirement: string;
    platform: string;
    status: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await fetch('/api/admin/leads');
            const data = await response.json();
            setLeads(data.leads || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateLeadStatus = async (id: string, status: string) => {
        try {
            const response = await fetch('/api/admin/leads', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status }),
            });

            if (response.ok) {
                alert('Lead status updated!');
                fetchLeads();
            } else {
                const data = await response.json();
                alert('Error updating status: ' + (data.error || 'Failed') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error updating lead:', error);
            alert('An unexpected error occurred: ' + error.message);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;

        try {
            const response = await fetch(`/api/admin/leads?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Lead deleted successfully!');
                fetchLeads();
            } else {
                const data = await response.json();
                alert('Error deleting lead: ' + (data.error || 'Failed') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error deleting lead:', error);
            alert('An unexpected error occurred: ' + error.message);
        }
    };

    const filteredLeads = leads.filter(lead =>
        filter === 'ALL' || lead.status === filter
    );

    if (loading) {
        return <div className={styles.loading}>Loading leads...</div>;
    }

    return (
        <div className={styles.leadsPage}>
            <div className={styles.header}>
                <h1>Leads Management</h1>
                <div className={styles.stats}>
                    <div className={styles.statBadge}>
                        Total: {leads.length}
                    </div>
                    <div className={styles.statBadge}>
                        New: {leads.filter(l => l.status === 'NEW').length}
                    </div>
                    <div className={styles.statBadge}>
                        In Progress: {leads.filter(l => l.status === 'IN_PROGRESS').length}
                    </div>
                </div>
            </div>

            <div className={styles.filters}>
                <button
                    className={filter === 'ALL' ? styles.activeFilter : ''}
                    onClick={() => setFilter('ALL')}
                >
                    All
                </button>
                <button
                    className={filter === 'NEW' ? styles.activeFilter : ''}
                    onClick={() => setFilter('NEW')}
                >
                    New
                </button>
                <button
                    className={filter === 'IN_PROGRESS' ? styles.activeFilter : ''}
                    onClick={() => setFilter('IN_PROGRESS')}
                >
                    In Progress
                </button>
                <button
                    className={filter === 'COMPLETED' ? styles.activeFilter : ''}
                    onClick={() => setFilter('COMPLETED')}
                >
                    Completed
                </button>
            </div>

            <div className={styles.leadsTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Service</th>
                            <th>Property</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id}>
                                <td>
                                    <div className={styles.leadName}>{lead.name}</div>
                                </td>
                                <td>
                                    <div className={styles.contact}>
                                        <div>{lead.email}</div>
                                        <div>{lead.phone}</div>
                                    </div>
                                </td>
                                <td>{lead.platform}</td>
                                <td>{lead.propertyName || '-'}</td>
                                <td>
                                    <select
                                        value={lead.status}
                                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                        className={styles.statusSelect}
                                    >
                                        <option value="NEW">New</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </td>
                                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => setEditingLead(lead)}
                                            className={styles.viewBtn}
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => deleteLead(lead.id)}
                                            className={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredLeads.length === 0 && (
                    <div className={styles.noLeads}>
                        No leads found
                    </div>
                )}
            </div>

            {editingLead && (
                <div className={styles.modal} onClick={() => setEditingLead(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Lead Details</h2>
                        <div className={styles.leadDetails}>
                            <div className={styles.detailRow}>
                                <strong>Name:</strong> {editingLead.name}
                            </div>
                            <div className={styles.detailRow}>
                                <strong>Email:</strong> {editingLead.email}
                            </div>
                            <div className={styles.detailRow}>
                                <strong>Phone:</strong> {editingLead.phone}
                            </div>
                            <div className={styles.detailRow}>
                                <strong>Service:</strong> {editingLead.platform}
                            </div>
                            {editingLead.propertyName && (
                                <div className={styles.detailRow}>
                                    <strong>Property:</strong> {editingLead.propertyName}
                                </div>
                            )}
                            {editingLead.location && (
                                <div className={styles.detailRow}>
                                    <strong>Location:</strong> {editingLead.location}
                                </div>
                            )}
                            <div className={styles.detailRow}>
                                <strong>Requirements:</strong>
                                <p>{editingLead.requirement}</p>
                            </div>
                            <div className={styles.detailRow}>
                                <strong>Created:</strong> {new Date(editingLead.createdAt).toLocaleString()}
                            </div>
                        </div>
                        <button
                            onClick={() => setEditingLead(null)}
                            className="btn btn-primary"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
