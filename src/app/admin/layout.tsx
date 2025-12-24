import { ReactNode } from 'react';
import Link from 'next/link';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import styles from './layout.module.css';

import { headers } from "next/headers";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    // If no session, the middleware will handle the redirect to /admin/login
    // However, if we are ON the login page, we want a clean view
    // We can't easily check the path here without headers (which were failing), 
    // so we'll check if session exists. If it does, show sidebar. If not, just children.

    if (!session) {
        return <>{children}</>;
    }

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <div style={{ position: 'relative', width: '150px', height: '40px', marginBottom: '10px' }}>
                        <img
                            src="/logo.png"
                            alt="Prime IDE"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navLink}>
                        <span className={styles.icon}>📊</span>
                        Dashboard
                    </Link>
                    <Link href="/admin/leads" className={styles.navLink}>
                        <span className={styles.icon}>👥</span>
                        Leads
                    </Link>
                    <Link href="/admin/projects" className={styles.navLink}>
                        <span className={styles.icon}>📁</span>
                        Projects
                    </Link>
                    <Link href="/admin/invoices" className={styles.navLink}>
                        <span className={styles.icon}>💰</span>
                        Invoices
                    </Link>
                    <Link href="/admin/demos" className={styles.navLink}>
                        <span className={styles.icon}>🖥️</span>
                        Demos
                    </Link>
                    <Link href="/admin/testimonials" className={styles.navLink}>
                        <span className={styles.icon}>⭐</span>
                        Testimonials
                    </Link>
                    <Link href="/admin/settings" className={styles.navLink}>
                        <span className={styles.icon}>⚙️</span>
                        Settings
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/admin/logout" className={styles.logoutBtn}>
                        <span className={styles.icon}>🚪</span>
                        Logout
                    </Link>
                </div>
            </aside>

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
