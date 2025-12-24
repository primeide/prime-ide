'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Testimonial {
    id: string;
    clientName: string;
    propertyName: string;
    location: string;
    photo: string;
    rating: number;
    text: string;
    status: string;
    createdAt: string;
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({
        clientName: '',
        propertyName: '',
        location: '',
        photo: '',
        rating: '5',
        text: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/admin/testimonials');
            const data = await response.json();
            setTestimonials(data.testimonials || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = '/api/admin/testimonials';
            const method = editingTestimonial ? 'PUT' : 'POST';
            const body = editingTestimonial
                ? { id: editingTestimonial.id, ...formData, rating: parseInt(formData.rating) }
                : { ...formData, rating: parseInt(formData.rating) };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
                fetchTestimonials();
                setShowModal(false);
                resetForm();
            } else {
                const data = await response.json();
                alert('Error: ' + (data.error || 'Failed to save testimonial'));
            }
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const deleteTestimonial = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const response = await fetch(`/api/admin/testimonials?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTestimonials();
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };

    const openEditModal = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setFormData({
            clientName: testimonial.clientName,
            propertyName: testimonial.propertyName,
            location: testimonial.location,
            photo: testimonial.photo,
            rating: testimonial.rating.toString(),
            text: testimonial.text,
            status: testimonial.status
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingTestimonial(null);
        setFormData({
            clientName: '',
            propertyName: '',
            location: '',
            photo: '',
            rating: '5',
            text: '',
            status: 'ACTIVE'
        });
    };

    if (loading) {
        return <div className={styles.loading}>Loading testimonials...</div>;
    }

    return (
        <div className={styles.projectsPage}>
            <div className={styles.header}>
                <h1>Testimonials Management</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="btn btn-primary"
                >
                    + New Testimonial
                </button>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Total Testimonials</div>
                    <div className={styles.statValue}>{testimonials.length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Active</div>
                    <div className={styles.statValue}>{testimonials.filter(t => t.status === 'ACTIVE').length}</div>
                </div>
            </div>

            <div className={styles.projectsGrid}>
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className={styles.projectCard}>
                        <div className={styles.projectHeader}>
                            <h3>{testimonial.clientName}</h3>
                            <span className={`${styles.statusBadge} ${styles[testimonial.status.toLowerCase()]}`}>
                                {testimonial.status}
                            </span>
                        </div>

                        <div className={styles.projectDetails}>
                            <div className={styles.detail}>
                                <strong>Property:</strong> {testimonial.propertyName} ({testimonial.location})
                            </div>
                            <div className={styles.detail}>
                                <strong>Rating:</strong> {'⭐'.repeat(testimonial.rating)}
                            </div>
                            {testimonial.photo && (
                                <div className={styles.detail}>
                                    <img src={testimonial.photo} alt={testimonial.clientName} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                            )}
                            <div className={styles.detail} style={{ fontStyle: 'italic' }}>
                                "{testimonial.text}"
                            </div>
                        </div>

                        <div className={styles.projectActions}>
                            <button
                                onClick={() => openEditModal(testimonial)}
                                className={styles.editBtn}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTestimonial(testimonial.id)}
                                className={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className={styles.noProjects}>
                    <p>No testimonials yet. Create your first testimonial!</p>
                </div>
            )}

            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>{editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}</h2>
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
                                    <label>Property Name *</label>
                                    <input
                                        type="text"
                                        value={formData.propertyName}
                                        onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Location *</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Client Photo URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.photo}
                                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Rating (1-5) *</label>
                                    <select
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                        required
                                    >
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
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
                                    <label>Testimonial Text *</label>
                                    <textarea
                                        rows={3}
                                        value={formData.text}
                                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingTestimonial ? 'Update' : 'Create'} Testimonial
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
