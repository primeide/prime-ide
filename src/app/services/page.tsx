import styles from './page.module.css';

const services = [
    {
        id: 'direct-booking-starter',
        icon: '🏨',
        title: 'Direct Booking Starter Plan',
        description: 'A fast-launch, conversion-focused website designed specifically for hotels, resorts, and homestays to start receiving direct enquiries and bookings.',
        benefits: [
            'Premium modern website (mobile-first & fast loading)',
            'Direct WhatsApp booking integration',
            'Inquiry / contact form with instant alerts',
            'Room showcase section',
            'Google Business Profile optimization',
            'Basic on-page SEO setup',
            'Call & Google Maps integration',
            '7-day post-launch support'
        ],
        deliveryTime: '3 Days',
        startingPrice: '₹24,999'
    },
    {
        id: 'full-booking-system',
        icon: '🚀',
        title: 'Full Online Booking System',
        description: 'A complete online booking system for hotels and resorts that want automated bookings, online payments, and inventory control.',
        benefits: [
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
        deliveryTime: '7–10 Days',
        startingPrice: '₹79,999'
    }
];

export default function ServicesPage() {
    return (
        <div className={styles.servicesPage}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Prime IDE Service Plans</h1>
                    <p className={styles.heroSubtitle}>
                        System-driven, booking-focused solutions for hotels, resorts, and homestays
                    </p>
                </div>
            </section>

            <section className={styles.servicesSection}>
                <div className="container">
                    {services.map((service, index) => (
                        <div key={index} id={service.id} className={styles.serviceDetail}>
                            <div className={styles.serviceHeader}>
                                <div className={styles.serviceIcon}>{service.icon}</div>
                                <div>
                                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                                    <p className={styles.serviceDescription}>{service.description}</p>
                                </div>
                            </div>

                            <div className={styles.serviceContent}>
                                <div className={styles.benefitsSection}>
                                    <h3>What's Included:</h3>
                                    <ul className={styles.benefitsList}>
                                        {service.benefits.map((benefit, i) => (
                                            <li key={i}>
                                                <span className={styles.checkmark}>✓</span>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.serviceInfo}>
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoLabel}>Expected Delivery</div>
                                        <div className={styles.infoValue}>{service.deliveryTime}</div>
                                    </div>
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoLabel}>Starting Price</div>
                                        <div className={styles.infoValue}>{service.startingPrice}</div>
                                    </div>
                                    <a href="/contact" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                        Book Free Consultation
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
