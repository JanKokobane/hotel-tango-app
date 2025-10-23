import React from 'react';
import styles from './Dashboard.module.css';

function StaffsSection() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Staff Management</h2>
      </div>
      <div className={styles.emptyState}>
        <p>Staff members will be displayed here</p>
      </div>
    </div>
  );
}

export default StaffsSection;
