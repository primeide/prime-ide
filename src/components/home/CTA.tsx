import Link from 'next/link';
import styles from './CTA.module.css';

export default function CTA() {
    return (
        <section className={styles.cta}>
            <div className="container">
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>
                        Ready to Transform Your Business?
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Get a premium website that drives results. Book your free consultation today!
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Book Free Consultation
                        </Link>
                        <a
                            href="https://wa.me/917907373687?text=Hi! I would like to know more about Prime IDE services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-lg"
                        >
                            WhatsApp Us
                        </a>
                    </div>
                    <div className={styles.ctaFeatures}>
                        <div className={styles.ctaFeature}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>No Credit Card Required</span>
                        </div>
                        <div className={styles.ctaFeature}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Free Consultation</span>
                        </div>
                        <div className={styles.ctaFeature}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
