import styles from './page.module.css';

export default function AdminDashboard() {
    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Dashboard Overview</h1>
                <div className={styles.userInfo}>
                    <span>Admin User</span>
                    <div className={styles.avatar}>A</div>
                </div>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📧</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>24</div>
                        <div className={styles.statLabel}>New Leads</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📁</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>12</div>
                        <div className={styles.statLabel}>Active Projects</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>✅</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>8</div>
                        <div className={styles.statLabel}>Pending Tasks</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>₹2.4L</div>
                        <div className={styles.statLabel}>Revenue (Month)</div>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.card}>
                    <h3>Recent Leads</h3>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div>Name</div>
                            <div>Service</div>
                            <div>Status</div>
                            <div>Date</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div>Rajesh Kumar</div>
                            <div>Hotel Website</div>
                            <div><span className={styles.badge}>New</span></div>
                            <div>Today</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div>Priya Sharma</div>
                            <div>Business Website</div>
                            <div><span className={styles.badge}>In Progress</span></div>
                            <div>Yesterday</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div>Amit Patel</div>
                            <div>E-commerce</div>
                            <div><span className={styles.badge}>New</span></div>
                            <div>2 days ago</div>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <h3>Active Projects</h3>
                    <div className={styles.projectList}>
                        <div className={styles.projectItem}>
                            <div>
                                <div className={styles.projectName}>Sunset Resort Website</div>
                                <div className={styles.projectClient}>Client: Rajesh Kumar</div>
                            </div>
                            <div className={styles.progress}>
                                <div className={styles.progressBar} style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className={styles.projectItem}>
                            <div>
                                <div className={styles.projectName}>Mountain Homestay</div>
                                <div className={styles.projectClient}>Client: Priya Sharma</div>
                            </div>
                            <div className={styles.progress}>
                                <div className={styles.progressBar} style={{ width: '50%' }}></div>
                            </div>
                        </div>
                        <div className={styles.projectItem}>
                            <div>
                                <div className={styles.projectName}>Business Portfolio</div>
                                <div className={styles.projectClient}>Client: Amit Patel</div>
                            </div>
                            <div className={styles.progress}>
                                <div className={styles.progressBar} style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
