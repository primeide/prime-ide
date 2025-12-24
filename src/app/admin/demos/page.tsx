'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Demo {
    id: string;
    title: string;
    type: string;
    thumbnail: string;
    description: string;
    url: string;
    status: string;
    createdAt: string;
}

export default function AdminDemosPage() {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDemo, setEditingDemo] = useState<Demo | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Hotel',
        thumbnail: '',
        description: '',
        url: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        fetchDemos();
    }, []);

    const fetchDemos = async () => {
        try {
            const response = await fetch('/api/admin/demos');
            const data = await response.json();
            setDemos(data.demos || []);
        } catch (error) {
            console.error('Error fetching demos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = '/api/admin/demos';
            const method = editingDemo ? 'PUT' : 'POST';
            const body = editingDemo
                ? { id: editingDemo.id, ...formData }
                : { ...formData };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingDemo ? 'Demo updated successfully!' : 'Demo created successfully!');
                fetchDemos();
                setShowModal(false);
                resetForm();
            } else {
                const data = await response.json();
                alert('Error: ' + (data.error || 'Failed to save demo'));
            }
        } catch (error) {
            console.error('Error saving demo:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const deleteDemo = async (id: string) => {
        if (!confirm('Are you sure you want to delete this demo?')) return;

        try {
            const response = await fetch(`/api/admin/demos?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchDemos();
            }
        } catch (error) {
            console.error('Error deleting demo:', error);
        }
    };

    const openEditModal = (demo: Demo) => {
        setEditingDemo(demo);
        setFormData({
            title: demo.title,
            type: demo.type,
            thumbnail: demo.thumbnail,
            description: demo.description,
            url: demo.url,
            status: demo.status
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingDemo(null);
        setFormData({
            title: '',
            type: 'Hotel',
            thumbnail: '',
            description: '',
            url: '',
            status: 'ACTIVE'
        });
    };

    if (loading) {
        return <div className={styles.loading}>Loading demos...</div>;
    }

    return (
        <div className={styles.projectsPage}>
            <div className={styles.header}>
                <h1>Demos Management</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="btn btn-primary"
                >
                    + New Demo
                </button>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Total Demos</div>
                    <div className={styles.statValue}>{demos.length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Active</div>
                    <div className={styles.statValue}>{demos.filter(d => d.status === 'ACTIVE').length}</div>
                </div>
            </div>

            <div className={styles.projectsGrid}>
                {demos.map((demo) => (
                    <div key={demo.id} className={styles.projectCard}>
                        <div className={styles.projectHeader}>
                            <h3>{demo.title}</h3>
                            <span className={`${styles.statusBadge} ${styles[demo.status.toLowerCase()]}`}>
                                {demo.status}
                            </span>
                        </div>

                        <div className={styles.projectDetails}>
                            <div className={styles.detail}>
                                <strong>Type:</strong> {demo.type}
                            </div>
                            <div className={styles.detail}>
                                <strong>URL:</strong> <a href={demo.url} target="_blank" rel="noopener noreferrer">{demo.url}</a>
                            </div>
                            {demo.thumbnail && (
                                <div className={styles.detail}>
                                    <img src={demo.thumbnail} alt={demo.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
                                </div>
                            )}
                            <div className={styles.detail}>
                                {demo.description}
                            </div>
                        </div>

                        <div className={styles.projectActions}>
                            <button
                                onClick={() => openEditModal(demo)}
                                className={styles.editBtn}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteDemo(demo.id)}
                                className={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {demos.length === 0 && (
                <div className={styles.noProjects}>
                    <p>No demos yet. Create your first demo!</p>
                </div>
            )}

            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>{editingDemo ? 'Edit Demo' : 'New Demo'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Demo Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Property Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        required
                                    >
                                        <option value="Hotel">Hotel</option>
                                        <option value="Resort">Resort</option>
                                        <option value="Homestay">Homestay</option>
                                        <option value="Villa">Villa</option>
                                    </select>
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Demo Thumbnail URL (or Upload path) *</label>
                                    <input
                                        type="text"
                                        value={formData.thumbnail}
                                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Demo Website URL *</label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
                                        <option value="ACTIVE">Active</option>
                                        <option value="HIDDEN">Hidden</option>
                                    </select>
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Short Description *</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingDemo ? 'Update' : 'Create'} Demo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
