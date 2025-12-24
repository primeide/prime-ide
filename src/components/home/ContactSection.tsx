import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section className={styles.contactSection}>
            <div className="container">
                <div className={styles.contactGrid}>
                    <div className={styles.contactInfo}>
                        <h2>Get in Touch</h2>
                        <p className={styles.subtitle}>
                            Ready to transform your business online? Let's discuss your project!
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

                    <div className={styles.quickContact}>
                        <h2>Quick Contact</h2>
                        <p className={styles.subtitle}>
                            Fill out the form and we'll get back to you within 24 hours
                        </p>

                        <div className={styles.ctaButtons}>
                            <a href="/contact" className="btn btn-primary btn-lg">
                                📝 Full Contact Form
                            </a>
                            <a
                                href="https://wa.me/917907373687?text=Hi! I would like to book a free consultation."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary btn-lg"
                            >
                                💬 WhatsApp Us
                            </a>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <span>Free Consultation</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <span>24/7 Support</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <span>Quick Response</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✓</span>
                                <span>Expert Team</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
