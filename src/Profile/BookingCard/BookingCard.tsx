import React from 'react';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import styles from './BookingCard.module.css';

interface BookingCardProps {
  id: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  imageUrl: string;
  price: number;
}

export const BookingCard = ({
  roomType,
  roomNumber,
  checkIn,
  checkOut,
  guests,
  status,
  imageUrl,
  price,
}: BookingCardProps) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'upcoming':
        return styles.badgeUpcoming;
      case 'completed':
        return styles.badgeCompleted;
      case 'cancelled':
        return styles.badgeCancelled;
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={roomType}
            className={styles.image}
          />
          <span className={`${styles.badge} ${getBadgeClass()}`}>
            {status}
          </span>
        </div>

        <div className={styles.details}>
          <div>
            <div className={styles.header}>
              <div className={styles.roomInfo}>
                <h3>{roomType}</h3>
                <p className={styles.roomLocation}>
                  <MapPin size={16} />
                  Room {roomNumber}
                </p>
              </div>
              <div className={styles.priceContainer}>
                <p className={styles.price}>${price}</p>
                <p className={styles.priceLabel}>per night</p>
              </div>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Calendar className={styles.infoIcon} size={20} />
                <div>
                  <p className={styles.infoLabel}>Check-in</p>
                  <p className={styles.infoValue}>{formatDate(checkIn)}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock className={styles.infoIcon} size={20} />
                <div>
                  <p className={styles.infoLabel}>Check-out</p>
                  <p className={styles.infoValue}>{formatDate(checkOut)}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <User className={styles.infoIcon} size={20} />
                <div>
                  <p className={styles.infoLabel}>Guests</p>
                  <p className={styles.infoValue}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
