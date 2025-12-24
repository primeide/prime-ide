import styles from './Services.module.css';

const services = [
    {
        icon: '🏨',
        title: 'Direct Booking Starter Plan',
        description: 'A fast-launch, conversion-focused website designed specifically for hotels, resorts, and homestays to start receiving direct enquiries and bookings.',
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
        price: '₹24,999',
        delivery: '3 Days'
    },
    {
        icon: '🚀',
        title: 'Full Online Booking System',
        description: 'A complete online booking system for hotels and resorts that want automated bookings, online payments, and inventory control.',
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
        price: '₹79,999',
        delivery: '7–10 Days'
    }
];

export default function Services() {
    return (
        <section className={styles.services} id="services">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Prime IDE Service Plans</h2>
                    <p className={styles.sectionSubtitle}>
                        System-driven, booking-focused solutions for hotels, resorts, and homestays
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>{service.icon}</div>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                            <ul className={styles.serviceFeatures}>
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <span className={styles.checkmark}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.servicePrice}>
                                <strong>{service.price}</strong>
                                <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.9 }}>
                                    Delivery: {service.delivery}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
