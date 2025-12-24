import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerLogo}>
                            <div style={{ position: 'relative', width: '150px', height: '40px' }}>
                                <img
                                    src="/logo.png"
                                    alt="Prime IDE"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                        </h3>
                        <p className={styles.tagline}>
                            AI-Powered Digital Solutions for Modern Businesses
                        </p>
                        <p className={styles.description}>
                            Websites worth ₹1,49,999 — delivered for ₹24,999 using next-gen AI.
                        </p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Quick Links</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/demos">Demos</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Services</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/services#hotels">Hotel Websites</Link></li>
                            <li><Link href="/services#business">Business Websites</Link></li>
                            <li><Link href="/services#ecommerce">E-commerce</Link></li>
                            <li><Link href="/services#booking">Booking Systems</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Contact Us</h4>
                        <ul className={styles.contactInfo}>
                            <li>
                                <strong>Email:</strong><br />
                                <a href="mailto:primeidecompany@gmail.com">primeidecompany@gmail.com</a>
                            </li>
                            <li>
                                <strong>Phone:</strong><br />
                                <a href="tel:+917907373687">+91 7907373687</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; {currentYear} Prime IDE. All rights reserved.</p>
                    <div className={styles.footerBottomLinks}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
