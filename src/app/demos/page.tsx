'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Demo {
    id: string;
    title: string;
    type: string;
    thumbnail: string;
    description: string;
    url: string;
    status: string;
    features?: string[]; // Optional since API might not return arrays for features yet
}

export default function DemosPage() {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/demos')
            .then(res => res.json())
            .then(data => {
                const activeDemos = (data.demos || []).filter((d: any) => d.status === 'ACTIVE');
                setDemos(activeDemos);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching demos:', err);
                setLoading(false);
            });
    }, []);

    // Placeholder features generator if not present
    const getFeatures = (type: string) => {
        if (type === 'Hotel') return ['Online Booking', 'Gallery', 'Reviews'];
        if (type === 'Homestay') return ['Calendar', 'Local Guide', 'Contact'];
        if (type === 'Villa') return ['Virtual Tour', 'Pricing', 'Availability'];
        return ['Responsive', 'Fast Loading', 'SEO Ready'];
    };

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
                    {loading ? (
                        <div className="text-center py-xl">Loading demos...</div>
                    ) : (
                        <div className={styles.demosGrid}>
                            {demos.map((demo) => (
                                <div key={demo.id} className={styles.demoCard}>
                                    <div className={styles.demoImage}>
                                        {demo.thumbnail ? (
                                            <img
                                                src={demo.thumbnail}
                                                alt={demo.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className={styles.demoIcon}>🖥️</div>
                                        )}
                                        <div className={styles.categoryBadge}>{demo.type}</div>
                                    </div>
                                    <div className={styles.demoContent}>
                                        <h3 className={styles.demoTitle}>{demo.title}</h3>
                                        <p className={styles.demoDescription}>{demo.description}</p>
                                        <div className={styles.demoFeatures}>
                                            {(demo.features && demo.features.length > 0
                                                ? demo.features
                                                : getFeatures(demo.type)
                                            ).map((feature, i) => (
                                                <span key={i} className={styles.featureTag}>{feature}</span>
                                            ))}
                                        </div>
                                        <Link href={demo.url || '#'} className="btn btn-primary" style={{ width: '100%' }}>
                                            View Demo
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
