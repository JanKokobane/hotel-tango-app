import React from 'react';
import styles from './Dashboard.module.css';

function DashboardOverview() {
  return (
    <div className={styles.emptySection}>
      <div className={styles.emptyState}>
        <h3>Dashboard Overview</h3>
        <p>Dashboard overview content will be displayed here</p>
      </div>
    </div>
  );
}

export default DashboardOverview;
