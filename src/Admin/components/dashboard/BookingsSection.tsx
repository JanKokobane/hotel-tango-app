import React from 'react';
import styles from './Dashboard.module.css';

function BookingsSection() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Reservations</h2>
      </div>
      <div className={styles.emptyState}>
        <p>Booking reservations will be displayed here</p>
      </div>
    </div>
  );
}

export default BookingsSection;
