import styles from './WhyChoose.module.css';

const reasons = [
    {
        icon: '⚡',
        title: 'Lightning Fast Delivery',
        description: 'Get your booking website up and running in just 3-10 days. Start receiving direct bookings immediately.'
    },
    {
        icon: '💎',
        title: 'Premium Quality, Affordable Price',
        description: 'Professional booking systems designed specifically for hotels and resorts. Get enterprise features at competitive prices.'
    },
    {
        icon: '🎯',
        title: 'Booking Optimized',
        description: 'Every element is designed to convert visitors into confirmed bookings. Maximize direct bookings and reduce OTA commissions.'
    },
    {
        icon: '📱',
        title: 'Mobile-First Design',
        description: 'Perfect experience on all devices. 70% of bookings happen on mobile - we make sure you capture them.'
    },
    {
        icon: '🔒',
        title: 'Secure & Reliable',
        description: 'Bank-level security, SSL certificates, and 99.9% uptime guarantee. Your data is safe with us.'
    },
    {
        icon: '🤝',
        title: 'Dedicated Support',
        description: '24/7 customer support via WhatsApp, email, and phone. We\'re always here when you need us.'
    }
];

export default function WhyChoose() {
    return (
        <section className={styles.whyChoose}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Why Choose Prime IDE?</h2>
                    <p className={styles.sectionSubtitle}>
                        We deliver system-driven, conversion-focused booking solutions for the hospitality industry
                    </p>
                </div>

                <div className={styles.reasonsGrid}>
                    {reasons.map((reason, index) => (
                        <div key={index} className={styles.reasonCard}>
                            <div className={styles.reasonIcon}>{reason.icon}</div>
                            <h3 className={styles.reasonTitle}>{reason.title}</h3>
                            <p className={styles.reasonDescription}>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
