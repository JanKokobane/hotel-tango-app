import React from 'react';
import styles from './Dashboard.module.css';

function ReviewsSection() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
      </div>
      <div className={styles.emptyState}>
        <p>Customer reviews will be displayed here</p>
      </div>
    </div>
  );
}

export default ReviewsSection;
