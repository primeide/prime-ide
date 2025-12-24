import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.heroImage}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/hero-bg.jpg"
                                alt="Hotel booking system illustration"
                                fill
                                style={{ objectFit: 'cover', borderRadius: 'var(--radius-2xl)' }}
                                priority
                            />
                            <div className={styles.floatingCard}>
                                <div className={styles.cardIcon}>🚀</div>
                                <div className={styles.cardText}>
                                    <div className={styles.cardTitle}>Fast Delivery</div>
                                    <div className={styles.cardDesc}>3–10 days</div>
                                </div>
                            </div>
                            <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
                                <div className={styles.cardIcon}>💰</div>
                                <div className={styles.cardText}>
                                    <div className={styles.cardTitle}>Starting Price</div>
                                    <div className={styles.cardDesc}>₹24,999</div>
                                </div>
                            </div>
                            <div className={`${styles.floatingCard} ${styles.floatingCard3}`}>
                                <div className={styles.cardIcon}>🏨</div>
                                <div className={styles.cardText}>
                                    <div className={styles.cardTitle}>Hotel Focused</div>
                                    <div className={styles.cardDesc}>Direct bookings</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className={`${styles.heroTitle} animate-fadeIn`}>
                        Get More Direct Bookings for Your
                        <span className={styles.highlight}> Hotel, Resort, or Homestay</span>
                    </h1>


                    <p className={`${styles.heroSubtitle} animate-fadeIn`}>
                        We build professional, booking-focused websites that help hotels, resorts, and homestays attract direct enquiries, reduce OTA dependency, and grow long-term visibility. Simple pricing, fast delivery, and systems built for results.
                    </p>

                    <div className={`${styles.heroButtons} animate-fadeIn`}>
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Book Free Consultation
                        </Link>
                        <Link href="/demos" className="btn btn-secondary btn-lg">
                            View Demos
                        </Link>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <div className={styles.statIcon}>💎</div>
                            <div className={styles.statLabel}>Transparent Pricing</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statIcon}>⚡</div>
                            <div className={styles.statLabel}>Fast Delivery</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statIcon}>🤝</div>
                            <div className={styles.statLabel}>24/7 Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
