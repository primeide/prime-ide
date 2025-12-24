'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Invoice {
    id: string;
    invoiceNumber: string;
    clientName: string;
    clientEmail: string;
    projectName: string;
    amount: number;
    status: string;
    dueDate: string;
    paidAt?: string;
    description?: string;
    createdAt: string;
}

export default function AdminInvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        projectName: '',
        amount: '',
        status: 'PENDING',
        dueDate: new Date().toISOString().split('T')[0],
        description: ''
    });

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await fetch('/api/admin/invoices');
            const data = await response.json();
            setInvoices(data.invoices || []);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = '/api/admin/invoices';
            const method = editingInvoice ? 'PUT' : 'POST';
            const body = editingInvoice
                ? { id: editingInvoice.id, ...formData, amount: parseFloat(formData.amount) }
                : { ...formData, amount: parseFloat(formData.amount) };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingInvoice ? 'Invoice updated successfully!' : 'Invoice created successfully!');
                fetchInvoices();
                setShowModal(false);
                resetForm();
            } else {
                const data = await response.json();
                alert('Error: ' + (data.error || 'Failed to save invoice') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error saving invoice:', error);
            alert('An unexpected error occurred: ' + error.message);
        }
    };

    const deleteInvoice = async (id: string) => {
        if (!confirm('Are you sure you want to delete this invoice?')) return;

        try {
            const response = await fetch(`/api/admin/invoices?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Invoice deleted successfully!');
                fetchInvoices();
            } else {
                const data = await response.json();
                alert('Error deleting invoice: ' + (data.error || 'Unknown error') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error deleting invoice:', error);
            alert('An unexpected error occurred during deletion: ' + error.message);
        }
    };

    const markAsPaid = async (id: string) => {
        try {
            const response = await fetch('/api/admin/invoices', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    status: 'PAID',
                    paidAt: new Date().toISOString()
                }),
            });

            if (response.ok) {
                alert('Invoice marked as paid!');
                fetchInvoices();
            } else {
                const data = await response.json();
                alert('Error updating invoice: ' + (data.error || 'Failed') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error updating invoice:', error);
            alert('An unexpected error occurred: ' + error.message);
        }
    };

    const openEditModal = (invoice: Invoice) => {
        setEditingInvoice(invoice);
        setFormData({
            clientName: invoice.clientName,
            clientEmail: invoice.clientEmail,
            projectName: invoice.projectName,
            amount: invoice.amount.toString(),
            status: invoice.status,
            dueDate: invoice.dueDate,
            description: invoice.description || ''
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingInvoice(null);
        setFormData({
            clientName: '',
            clientEmail: '',
            projectName: '',
            amount: '',
            status: 'PENDING',
            dueDate: new Date().toISOString().split('T')[0],
            description: ''
        });
    };

    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = invoices.filter(inv => inv.status === 'PENDING').reduce((sum, inv) => sum + inv.amount, 0);

    if (loading) {
        return <div className={styles.loading}>Loading invoices...</div>;
    }

    return (
        <div className={styles.invoicesPage}>
            <div className={styles.header}>
                <h1>Invoices Management</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="btn btn-primary"
                >
                    + New Invoice
                </button>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Total Revenue</div>
                    <div className={styles.statValue}>₹{totalAmount.toLocaleString()}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Paid</div>
                    <div className={styles.statValue} style={{ color: '#10B981' }}>₹{paidAmount.toLocaleString()}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Pending</div>
                    <div className={styles.statValue} style={{ color: '#F59E0B' }}>₹{pendingAmount.toLocaleString()}</div>
                </div>
            </div>

            <div className={styles.invoicesTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Client</th>
                            <th>Project</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className={styles.invoiceNumber}>{invoice.invoiceNumber}</td>
                                <td>
                                    <div className={styles.clientInfo}>
                                        <div className={styles.clientName}>{invoice.clientName}</div>
                                        <div className={styles.clientEmail}>{invoice.clientEmail}</div>
                                    </div>
                                </td>
                                <td>{invoice.projectName}</td>
                                <td className={styles.amount}>₹{invoice.amount.toLocaleString()}</td>
                                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[invoice.status.toLowerCase()]}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        {invoice.status === 'PENDING' && (
                                            <button
                                                onClick={() => markAsPaid(invoice.id)}
                                                className={styles.paidBtn}
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                        <button
                                            onClick={() => openEditModal(invoice)}
                                            className={styles.editBtn}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteInvoice(invoice.id)}
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

                {invoices.length === 0 && (
                    <div className={styles.noInvoices}>
                        <p>No invoices yet. Create your first invoice!</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>{editingInvoice ? 'Edit Invoice' : 'New Invoice'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Client Name *</label>
                                    <input
                                        type="text"
                                        value={formData.clientName}
                                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Client Email *</label>
                                    <input
                                        type="email"
                                        value={formData.clientEmail}
                                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Project Name *</label>
                                    <input
                                        type="text"
                                        value={formData.projectName}
                                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Amount (₹) *</label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Due Date *</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Status *</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        required
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="PAID">Paid</option>
                                        <option value="OVERDUE">Overdue</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Description</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingInvoice ? 'Update' : 'Create'} Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
