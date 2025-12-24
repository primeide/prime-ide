
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './DemoPreviews.module.css';

interface Demo {
    id: string;
    title: string;
    type: string;
    thumbnail: string;
    description: string;
    url: string;
    status: string;
}

export default function DemoPreviews() {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/demos')
            .then(res => res.json())
            .then(data => {
                // Filter active demos and limit to 6 for the homepage
                const activeDemos = (data.demos || []).filter((d: any) => d.status === 'ACTIVE').slice(0, 6);
                setDemos(activeDemos);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching demos:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section className={styles.demoPreviews}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Our Website Demos</h2>
                    <p className={styles.sectionSubtitle}>
                        Explore our portfolio of stunning, high-converting websites
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-xl">Loading demos...</div>
                ) : (
                    <div className={styles.demosGrid}>
                        {demos.map((demo) => (
                            <div key={demo.id} className={styles.demoCard}>
                                <div className={styles.demoImage}>
                                    {demo.thumbnail ? (
                                        <img src={demo.thumbnail} alt={demo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div className={styles.demoIcon}>🏨</div>
                                    )}
                                    <div className={styles.demoOverlay}>
                                        <Link href="/demos" className="btn btn-primary">
                                            View Demo
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.demoContent}>
                                    <span className={styles.demoCategory}>{demo.type}</span>
                                    <h3 className={styles.demoTitle}>{demo.title}</h3>
                                    <p className={styles.demoDescription}>{demo.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.viewAllButton}>
                    <Link href="/demos" className="btn btn-primary btn-lg">
                        View All Demos
                    </Link>
                </div>
            </div>
        </section>
    );
}
