'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    return (
        <nav className={styles.navbar}>
            <div className="container">
                <div className={styles.navContent}>
                    <Link href="/" className={styles.logo}>
                        <div style={{ position: 'relative', width: '150px', height: '40px' }}>
                            <img
                                src="/logo.png"
                                alt="Prime IDE"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                    </Link>

                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={styles.hamburger}></span>
                        <span className={styles.hamburger}></span>
                        <span className={styles.hamburger}></span>
                    </button>

                    <div className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href="/services" className={styles.navLink}>Services</Link>
                        <Link href="/demos" className={styles.navLink}>Demos</Link>
                        <Link href="/contact" className={styles.navLink}>Contact</Link>
                        <Link href="/contact" className="btn btn-primary btn-sm">
                            Book Free Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
