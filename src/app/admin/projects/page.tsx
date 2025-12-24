'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Project {
    id: string;
    name: string;
    clientName: string;
    clientEmail: string;
    websiteType: string;
    price: number;
    status: string;
    progress: number;
    startDate: string;
    endDate?: string;
    description?: string;
    createdAt: string;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        clientName: '',
        clientEmail: '',
        websiteType: 'Hotel Website',
        price: '',
        status: 'ACTIVE',
        progress: '0',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        description: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/admin/projects');
            const data = await response.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = '/api/admin/projects';
            const method = editingProject ? 'PUT' : 'POST';
            const body = editingProject
                ? { id: editingProject.id, ...formData, price: parseFloat(formData.price), progress: parseInt(formData.progress) }
                : { ...formData, price: parseFloat(formData.price), progress: parseInt(formData.progress) };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
                fetchProjects();
                setShowModal(false);
                resetForm();
            } else {
                const data = await response.json();
                alert('Error: ' + (data.error || 'Failed to save project') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error saving project:', error);
            alert('An unexpected error occurred: ' + error.message);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/admin/projects?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Project deleted successfully!');
                fetchProjects();
            } else {
                const data = await response.json();
                alert('Error deleting project: ' + (data.error || 'Unknown error') + '\nDetails: ' + (data.details || 'No details provided'));
            }
        } catch (error: any) {
            console.error('Error deleting project:', error);
            alert('An unexpected error occurred during deletion: ' + error.message);
        }
    };

    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            clientName: project.clientName,
            clientEmail: project.clientEmail,
            websiteType: project.websiteType,
            price: project.price.toString(),
            status: project.status,
            progress: project.progress.toString(),
            startDate: project.startDate,
            endDate: project.endDate || '',
            description: project.description || ''
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingProject(null);
        setFormData({
            name: '',
            clientName: '',
            clientEmail: '',
            websiteType: 'Hotel Website',
            price: '',
            status: 'ACTIVE',
            progress: '0',
            startDate: new Date().toISOString().split('T')[0],
            endDate: '',
            description: ''
        });
    };

    if (loading) {
        return <div className={styles.loading}>Loading projects...</div>;
    }

    return (
        <div className={styles.projectsPage}>
            <div className={styles.header}>
                <h1>Projects Management</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="btn btn-primary"
                >
                    + New Project
                </button>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Total Projects</div>
                    <div className={styles.statValue}>{projects.length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Active</div>
                    <div className={styles.statValue}>{projects.filter(p => p.status === 'ACTIVE').length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Completed</div>
                    <div className={styles.statValue}>{projects.filter(p => p.status === 'COMPLETED').length}</div>
                </div>
            </div>

            <div className={styles.projectsGrid}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.projectHeader}>
                            <h3>{project.name}</h3>
                            <span className={`${styles.statusBadge} ${styles[project.status.toLowerCase()]}`}>
                                {project.status}
                            </span>
                        </div>

                        <div className={styles.projectDetails}>
                            <div className={styles.detail}>
                                <strong>Client:</strong> {project.clientName}
                            </div>
                            <div className={styles.detail}>
                                <strong>Type:</strong> {project.websiteType}
                            </div>
                            <div className={styles.detail}>
                                <strong>Price:</strong> ₹{project.price.toLocaleString()}
                            </div>
                            <div className={styles.detail}>
                                <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
                            </div>
                        </div>

                        <div className={styles.progressSection}>
                            <div className={styles.progressLabel}>
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className={styles.projectActions}>
                            <button
                                onClick={() => openEditModal(project)}
                                className={styles.editBtn}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteProject(project.id)}
                                className={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className={styles.noProjects}>
                    <p>No projects yet. Create your first project!</p>
                </div>
            )}

            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProject ? 'Edit Project' : 'New Project'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Project Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

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
                                    <label>Website Type *</label>
                                    <select
                                        value={formData.websiteType}
                                        onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                                        required
                                    >
                                        <option value="Hotel Website">Hotel Website</option>
                                        <option value="Business Website">Business Website</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="Booking System">Booking System</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Price (₹) *</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                                        <option value="COMPLETED">Completed</option>
                                        <option value="ON_HOLD">On Hold</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Progress (%) *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.progress}
                                        onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Start Date *</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
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
                                    {editingProject ? 'Update' : 'Create'} Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
