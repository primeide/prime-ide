'use client';

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

interface Testimonial {
    id: string;
    clientName: string;
    propertyName: string;
    location: string;
    photo: string;
    rating: number;
    text: string;
    status: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/testimonials')
            .then(res => res.json())
            .then(data => {
                const active = (data.testimonials || []).filter((t: any) => t.status === 'ACTIVE');
                setTestimonials(active);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching testimonials:', err);
                setLoading(false);
            });
    }, []);

    const nextTestimonial = () => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (loading) {
        return <div className={styles.testimonials}><div className="container text-center">Loading testimonials...</div></div>;
    }

    if (testimonials.length === 0) {
        return null; // Or show "Testimonials coming soon"
    }

    const current = testimonials[currentIndex];

    return (
        <section className={styles.testimonials}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
                    <p className={styles.sectionSubtitle}>
                        Trusted by growing hospitality brands
                    </p>
                </div>

                <div className={styles.testimonialSlider}>
                    <button
                        className={styles.sliderButton}
                        onClick={prevTestimonial}
                        aria-label="Previous testimonial"
                    >
                        ‹
                    </button>

                    <div className={styles.testimonialCard}>
                        <div className={styles.testimonialImage}>
                            {current.photo ? (
                                <img src={current.photo} alt={current.clientName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ fontSize: '3rem' }}>👤</div>
                            )}
                        </div>
                        <div className={styles.rating}>
                            {'★'.repeat(current.rating)}
                        </div>
                        <p className={styles.testimonialText}>
                            "{current.text}"
                        </p>
                        <div className={styles.testimonialAuthor}>
                            <div className={styles.authorName}>{current.clientName}</div>
                            <div className={styles.authorBusiness}>{current.propertyName}, {current.location}</div>
                        </div>
                    </div>

                    <button
                        className={styles.sliderButton}
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                    >
                        ›
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
