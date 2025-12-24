import Link from 'next/link';
import styles from './Pricing.module.css';

const plans = [
    {
        name: 'Direct Booking Starter Plan',
        price: '₹24,999',
        delivery: '3 Days',
        description: 'Fast-launch, conversion-focused website for hotels, resorts, and homestays',
        features: [
            'Premium modern website (mobile-first & fast loading)',
            'Direct WhatsApp booking integration',
            'Inquiry / contact form with instant alerts',
            'Room showcase section',
            'Google Business Profile optimization',
            'Basic on-page SEO setup',
            'Call & Google Maps integration',
            '7-day post-launch support'
        ],
        popular: false
    },
    {
        name: 'Full Online Booking System',
        price: '₹79,999',
        delivery: '7–10 Days',
        description: 'Complete online booking system with automated bookings and payments',
        features: [
            'Everything in Direct Booking Starter Plan',
            'Full online booking engine',
            'Payment gateway integration (UPI / cards)',
            'Automated booking & payment confirmations',
            'Room inventory & availability management',
            'Seasonal pricing support',
            'WhatsApp & email notifications',
            'Advanced SEO & performance optimization',
            'Priority support'
        ],
        popular: true
    }
];

export default function Pricing() {
    return (
        <section className={styles.pricing}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Transparent Pricing</h2>
                    <p className={styles.sectionSubtitle}>
                        Choose the plan that fits your needs. No hidden fees, no surprises.
                    </p>
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`${styles.pricingCard} ${plan.popular ? styles.popularCard : ''}`}
                        >
                            {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
                            <h3 className={styles.planName}>{plan.name}</h3>
                            <div className={styles.planPrice}>{plan.price}</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1rem' }}>
                                Delivery: {plan.delivery}
                            </div>
                            <p className={styles.planDescription}>{plan.description}</p>
                            <ul className={styles.planFeatures}>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <span className={styles.checkmark}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                                style={{ width: '100%' }}
                            >
                                Book Free Consultation
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={styles.pricingNote}>
                    <p>
                        💡 <strong>Custom requirements?</strong> Contact us for a personalized quote tailored to your specific needs.
                    </p>
                </div>
            </div>
        </section>
    );
}
