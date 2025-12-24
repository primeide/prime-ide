'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        propertyName: '',
        location: '',
        requirement: '',
        platform: 'Direct Booking Starter Plan'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage(data.message || 'Thank you! We\'ll get back to you within 24 hours.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    propertyName: '',
                    location: '',
                    requirement: '',
                    platform: 'Direct Booking Starter Plan'
                });
            } else {
                setSubmitMessage(data.error || 'Something went wrong. Please try again or contact us via WhatsApp.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitMessage('Something went wrong. Please try again or contact us via WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.contactPage}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Get in Touch</h1>
                    <p className={styles.heroSubtitle}>
                        Let's discuss how we can help your hotel or resort get more direct bookings
                    </p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.contactGrid}>
                        <div className={styles.contactInfo}>
                            <h2>Contact Information</h2>
                            <p className={styles.contactIntro}>
                                Have questions? We're here to help! Reach out to us via any of the following channels.
                            </p>

                            <div className={styles.contactMethods}>
                                <div className={styles.contactMethod}>
                                    <div className={styles.methodIcon}>📧</div>
                                    <div>
                                        <h3>Email</h3>
                                        <a href="mailto:primeidecompany@gmail.com">primeidecompany@gmail.com</a>
                                    </div>
                                </div>

                                <div className={styles.contactMethod}>
                                    <div className={styles.methodIcon}>📱</div>
                                    <div>
                                        <h3>Phone</h3>
                                        <a href="tel:+917907373687">+91 7907373687</a>
                                    </div>
                                </div>

                                <div className={styles.contactMethod}>
                                    <div className={styles.methodIcon}>💬</div>
                                    <div>
                                        <h3>WhatsApp</h3>
                                        <a
                                            href="https://wa.me/917907373687?text=Hi! I would like to know more about Prime IDE services."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Chat with us
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.businessHours}>
                                <h3>Business Hours</h3>
                                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                                <p>Sunday: 10:00 AM - 5:00 PM</p>
                            </div>
                        </div>

                        <div className={styles.contactForm}>
                            <h2>Send us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="propertyName">Business/Property Name</label>
                                        <input
                                            type="text"
                                            id="propertyName"
                                            name="propertyName"
                                            value={formData.propertyName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="location">Location</label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="platform">Service Required *</label>
                                    <select
                                        id="platform"
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Direct Booking Starter Plan">Direct Booking Starter Plan (₹24,999)</option>
                                        <option value="Full Online Booking System">Full Online Booking System (₹79,999)</option>
                                        <option value="Custom Requirements">Custom Requirements</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="requirement">Tell us about your requirements *</label>
                                    <textarea
                                        id="requirement"
                                        name="requirement"
                                        rows={5}
                                        value={formData.requirement}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={isSubmitting}
                                    style={{ width: '100%' }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Book Free Consultation'}
                                </button>

                                {submitMessage && (
                                    <div className={`${styles.submitMessage} ${submitMessage.includes('Thank') ? styles.success : styles.error}`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
