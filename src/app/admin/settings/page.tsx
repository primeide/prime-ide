'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [generalSettings, setGeneralSettings] = useState({
        companyName: 'Prime IDE',
        email: 'primeidecompany@gmail.com',
        phone: '+91 7907373687',
        address: 'India',
        website: 'https://primeide.com'
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        newLeadAlert: true,
        projectUpdates: true,
        invoiceReminders: true,
        weeklyReport: false
    });

    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleGeneralSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('General settings saved successfully!');
    };

    const handleNotificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Notification settings saved successfully!');
    };

    const handleSecuritySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (securitySettings.newPassword !== securitySettings.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password changed successfully!');
        setSecuritySettings({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <div className={styles.settingsPage}>
            <div className={styles.header}>
                <h1>Settings</h1>
            </div>

            <div className={styles.settingsContainer}>
                <div className={styles.sidebar}>
                    <button
                        className={activeTab === 'general' ? styles.active : ''}
                        onClick={() => setActiveTab('general')}
                    >
                        <span className={styles.icon}>⚙️</span>
                        General
                    </button>
                    <button
                        className={activeTab === 'notifications' ? styles.active : ''}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <span className={styles.icon}>🔔</span>
                        Notifications
                    </button>
                    <button
                        className={activeTab === 'security' ? styles.active : ''}
                        onClick={() => setActiveTab('security')}
                    >
                        <span className={styles.icon}>🔒</span>
                        Security
                    </button>
                    <button
                        className={activeTab === 'billing' ? styles.active : ''}
                        onClick={() => setActiveTab('billing')}
                    >
                        <span className={styles.icon}>💳</span>
                        Billing
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'general' && (
                        <div className={styles.section}>
                            <h2>General Settings</h2>
                            <p className={styles.description}>
                                Manage your company information and preferences
                            </p>

                            <form onSubmit={handleGeneralSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        value={generalSettings.companyName}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={generalSettings.email}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={generalSettings.phone}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value={generalSettings.address}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Website</label>
                                    <input
                                        type="url"
                                        value={generalSettings.website}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className={styles.section}>
                            <h2>Notification Settings</h2>
                            <p className={styles.description}>
                                Choose what notifications you want to receive
                            </p>

                            <form onSubmit={handleNotificationSubmit} className={styles.form}>
                                <div className={styles.toggleGroup}>
                                    <div className={styles.toggleItem}>
                                        <div>
                                            <div className={styles.toggleLabel}>Email Notifications</div>
                                            <div className={styles.toggleDescription}>Receive notifications via email</div>
                                        </div>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.emailNotifications}
                                                onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>

                                    <div className={styles.toggleItem}>
                                        <div>
                                            <div className={styles.toggleLabel}>New Lead Alerts</div>
                                            <div className={styles.toggleDescription}>Get notified when a new lead is submitted</div>
                                        </div>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.newLeadAlert}
                                                onChange={(e) => setNotificationSettings({ ...notificationSettings, newLeadAlert: e.target.checked })}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>

                                    <div className={styles.toggleItem}>
                                        <div>
                                            <div className={styles.toggleLabel}>Project Updates</div>
                                            <div className={styles.toggleDescription}>Receive updates about project progress</div>
                                        </div>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.projectUpdates}
                                                onChange={(e) => setNotificationSettings({ ...notificationSettings, projectUpdates: e.target.checked })}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>

                                    <div className={styles.toggleItem}>
                                        <div>
                                            <div className={styles.toggleLabel}>Invoice Reminders</div>
                                            <div className={styles.toggleDescription}>Get reminded about pending invoices</div>
                                        </div>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.invoiceReminders}
                                                onChange={(e) => setNotificationSettings({ ...notificationSettings, invoiceReminders: e.target.checked })}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>

                                    <div className={styles.toggleItem}>
                                        <div>
                                            <div className={styles.toggleLabel}>Weekly Reports</div>
                                            <div className={styles.toggleDescription}>Receive weekly summary reports</div>
                                        </div>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.weeklyReport}
                                                onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReport: e.target.checked })}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Save Preferences
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className={styles.section}>
                            <h2>Security Settings</h2>
                            <p className={styles.description}>
                                Update your password and security preferences
                            </p>

                            <form onSubmit={handleSecuritySubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        value={securitySettings.currentPassword}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                                        placeholder="Enter current password"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        value={securitySettings.newPassword}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={securitySettings.confirmPassword}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Change Password
                                </button>
                            </form>

                            <div className={styles.securityInfo}>
                                <h3>Security Tips</h3>
                                <ul>
                                    <li>Use a strong password with at least 8 characters</li>
                                    <li>Include uppercase, lowercase, numbers, and symbols</li>
                                    <li>Don't reuse passwords from other accounts</li>
                                    <li>Change your password regularly</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className={styles.section}>
                            <h2>Billing Information</h2>
                            <p className={styles.description}>
                                Manage your billing details and payment methods
                            </p>

                            <div className={styles.billingCard}>
                                <div className={styles.billingHeader}>
                                    <h3>Current Plan</h3>
                                    <span className={styles.planBadge}>Professional</span>
                                </div>
                                <div className={styles.billingDetails}>
                                    <div className={styles.billingItem}>
                                        <span>Plan Type:</span>
                                        <strong>Professional</strong>
                                    </div>
                                    <div className={styles.billingItem}>
                                        <span>Billing Cycle:</span>
                                        <strong>Monthly</strong>
                                    </div>
                                    <div className={styles.billingItem}>
                                        <span>Next Billing Date:</span>
                                        <strong>January 10, 2025</strong>
                                    </div>
                                    <div className={styles.billingItem}>
                                        <span>Amount:</span>
                                        <strong>₹2,999/month</strong>
                                    </div>
                                </div>
                                <button className="btn btn-secondary">
                                    Upgrade Plan
                                </button>
                            </div>

                            <div className={styles.paymentMethods}>
                                <h3>Payment Methods</h3>
                                <div className={styles.paymentCard}>
                                    <div className={styles.cardIcon}>💳</div>
                                    <div className={styles.cardDetails}>
                                        <div className={styles.cardName}>Visa ending in 4242</div>
                                        <div className={styles.cardExpiry}>Expires 12/25</div>
                                    </div>
                                    <button className={styles.removeBtn}>Remove</button>
                                </div>
                                <button className="btn btn-secondary">
                                    + Add Payment Method
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
