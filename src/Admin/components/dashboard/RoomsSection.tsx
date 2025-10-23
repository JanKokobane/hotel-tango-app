import { Plus } from 'lucide-react';
import styles from './Dashboard.module.css';
import { Room } from '../../AdminDashboard';
import React from 'react';

interface RoomsSectionProps {
  onAddRoom: () => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (roomId: string) => void;
}

function RoomsSection({ onAddRoom }: RoomsSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Rooms Management</h2>
        <button className={styles.primaryButton} onClick={onAddRoom}>
          <Plus size={20} />
          Add Room
        </button>
      </div>
      <div className={styles.emptyState}>
        <p>Rooms will be displayed here</p>
      </div>
    </div>
  );
}

export default RoomsSection;
