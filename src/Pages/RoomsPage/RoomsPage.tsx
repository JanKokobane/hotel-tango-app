import { useEffect, useState } from 'react';
import styles from './RoomsPage.module.css';
import type { Room } from '../../Admin/AdminDashboard';
import React from 'react';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tango-hotel-backend.onrender.com';

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/rooms`);
        if (!res.ok) throw new Error('Failed to fetch rooms');
        const data = await res.json();
        setRooms(data);
      } catch (err: any) {
        console.error('Error fetching rooms:', err);
        setError('Could not load rooms. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Available Rooms</h1>

      {loading && <p className={styles.status}>Loading rooms...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {rooms.map(room => (
          <div key={room.id} className={styles.card}>
            <img src={room.image} alt={room.name} className={styles.image} />
            <div className={styles.details}>
              <h2>{room.name}</h2>
              <p className={styles.type}>{room.type} • {room.status}</p>
              <p className={styles.price}>R{room.price} / night</p>
              <p className={styles.capacity}>Sleeps {room.capacity}</p>
              <p className={styles.description}>{room.description}</p>
              <p className={styles.amenities}>
                {Array.isArray(room.amenities)
                  ? room.amenities.join(', ')
                  : room.amenities}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
