'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Stat {
    label: string;
    value: string | number;
    icon: string;
}

interface Lead {
    id: string;
    name: string;
    platform: string;
    status: string;
    createdAt: string;
}

interface Project {
    id: string;
    title: string;
    clientName: string;
    status: string;
    progress: number;
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState<Stat[]>([
        { label: 'New Leads', value: '0', icon: '📧' },
        { label: 'Active Projects', value: '0', icon: '📁' },
        { label: 'Completed', value: '0', icon: '✅' },
        { label: 'Revenue (Month)', value: '₹0', icon: '💰' }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [leadsRes, projectsRes] = await Promise.all([
                fetch('/api/admin/leads'),
                fetch('/api/admin/projects')
            ]);

            const leadsData = await leadsRes.json();
            const projectsData = await projectsRes.json();

            const allLeads = leadsData.leads || [];
            const allProjects = projectsData.projects || [];

            setLeads(allLeads.slice(0, 5)); // Show only top 5
            setProjects(allProjects.slice(0, 5));

            setStats([
                {
                    label: 'New Leads',
                    value: allLeads.filter((l: any) => l.status === 'NEW').length,
                    icon: '📧'
                },
                {
                    label: 'Active Projects',
                    value: allProjects.filter((p: any) => p.status === 'IN_PROGRESS').length,
                    icon: '📁'
                },
                {
                    label: 'Completed',
                    value: allProjects.filter((p: any) => p.status === 'COMPLETED').length,
                    icon: '✅'
                },
                {
                    label: 'Revenue (Month)',
                    value: '₹' + allProjects.reduce((acc: number, p: any) => acc + (p.budget || 0), 0),
                    icon: '💰'
                }
            ]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.dashboard}><p>Loading dashboard...</p></div>;
    }

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
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    </div>
                ))}
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
                        {leads.map((lead) => (
                            <div key={lead.id} className={styles.tableRow}>
                                <div>{lead.name}</div>
                                <div>{lead.platform}</div>
                                <div><span className={`${styles.badge} ${styles[lead.status.toLowerCase()]}`}>{lead.status}</span></div>
                                <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                            </div>
                        ))}
                        {leads.length === 0 && <div className={styles.tableRow}>No leads found</div>}
                    </div>
                </div>

                <div className={styles.card}>
                    <h3>Active Projects</h3>
                    <div className={styles.projectList}>
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectItem}>
                                <div>
                                    <div className={styles.projectName}>{project.title}</div>
                                    <div className={styles.projectClient}>Client: {project.clientName}</div>
                                </div>
                                <div className={styles.progress}>
                                    <div className={styles.progressBar} style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && <div className={styles.projectItem}>No active projects found</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
