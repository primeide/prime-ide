import Link from 'next/link';
import styles from './page.module.css';

const demos = [
    {
        title: 'Luxury Beach Resort',
        category: 'Hotel',
        icon: '🏖️',
        description: 'Premium beachfront resort with integrated booking system, photo gallery, and guest reviews.',
        features: ['Online Booking', 'Photo Gallery', 'Reviews', 'Multi-language'],
        url: '#'
    },
    {
        title: 'Mountain Homestay',
        category: 'Homestay',
        icon: '⛰️',
        description: 'Cozy mountain retreat with online reservations and local experience showcase.',
        features: ['Booking Calendar', 'Activities', 'Testimonials', 'Contact Form'],
        url: '#'
    },
    {
        title: 'City Business Hotel',
        category: 'Hotel',
        icon: '🏨',
        description: 'Modern business hotel with conference facilities and corporate booking options.',
        features: ['Corporate Booking', 'Meeting Rooms', 'Amenities', 'Location Map'],
        url: '#'
    },
    {
        title: 'Boutique Villa',
        category: 'Villa',
        icon: '🏡',
        description: 'Exclusive villa rental with instant booking and virtual tour.',
        features: ['Virtual Tour', 'Instant Booking', 'Pricing Calculator', 'Availability'],
        url: '#'
    },
    {
        title: 'Heritage Property',
        category: 'Hotel',
        icon: '🏰',
        description: 'Historic heritage hotel with rich storytelling and cultural experiences.',
        features: ['History Section', 'Cultural Tours', 'Events', 'Gallery'],
        url: '#'
    },
    {
        title: 'Eco Resort',
        category: 'Resort',
        icon: '🌿',
        description: 'Sustainable eco-resort highlighting green practices and nature experiences.',
        features: ['Sustainability', 'Nature Activities', 'Eco Tours', 'Blog'],
        url: '#'
    },
    {
        title: 'Restaurant & Cafe',
        category: 'Business',
        icon: '🍽️',
        description: 'Restaurant website with online menu, table reservations, and food delivery.',
        features: ['Online Menu', 'Reservations', 'Delivery', 'Reviews'],
        url: '#'
    },
    {
        title: 'Spa & Wellness Center',
        category: 'Business',
        icon: '💆',
        description: 'Spa center with appointment booking, service packages, and membership options.',
        features: ['Appointment Booking', 'Service Packages', 'Membership', 'Gift Cards'],
        url: '#'
    },
    {
        title: 'Adventure Camp',
        category: 'Resort',
        icon: '🏕️',
        description: 'Adventure camp with activity booking, package deals, and safety information.',
        features: ['Activity Booking', 'Packages', 'Safety Info', 'Photo Gallery'],
        url: '#'
    },
    {
        title: 'Yoga Retreat',
        category: 'Wellness',
        icon: '🧘',
        description: 'Wellness retreat with program schedules, instructor profiles, and retreat booking.',
        features: ['Program Schedule', 'Instructors', 'Retreat Booking', 'Testimonials'],
        url: '#'
    }
];

export default function DemosPage() {
    return (
        <div className={styles.demosPage}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Website Demos</h1>
                    <p className={styles.heroSubtitle}>
                        Explore our portfolio of stunning, high-converting websites
                    </p>
                </div>
            </section>

            <section className={styles.demosSection}>
                <div className="container">
                    <div className={styles.demosGrid}>
                        {demos.map((demo, index) => (
                            <div key={index} className={styles.demoCard}>
                                <div className={styles.demoImage}>
                                    <div className={styles.demoIcon}>{demo.icon}</div>
                                    <div className={styles.categoryBadge}>{demo.category}</div>
                                </div>
                                <div className={styles.demoContent}>
                                    <h3 className={styles.demoTitle}>{demo.title}</h3>
                                    <p className={styles.demoDescription}>{demo.description}</p>
                                    <div className={styles.demoFeatures}>
                                        {demo.features.map((feature, i) => (
                                            <span key={i} className={styles.featureTag}>{feature}</span>
                                        ))}
                                    </div>
                                    <Link href={demo.url} className="btn btn-primary" style={{ width: '100%' }}>
                                        View Demo
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Want a Website Like These?</h2>
                        <p>Get your custom website designed and delivered in just 7-14 days</p>
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Book Free Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
