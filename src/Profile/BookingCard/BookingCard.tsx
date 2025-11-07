import React from 'react';
import { Calendar, MapPin, User, Clock, Heart } from 'lucide-react';
import styles from './BookingCard.module.css';

interface BookingCardProps {
  id: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'unpaid';
  imageUrl: string;
  price: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPayNow?: () => void;
  onCancelBooking?: () => void;
}

export const BookingCard = ({
  id,
  roomType,
  roomNumber,
  checkIn,
  checkOut,
  guests,
  status,
  paymentStatus,
  imageUrl,
  price,
  isFavorite = false,
  onToggleFavorite,
  onPayNow,
  onCancelBooking,
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

  const getPaymentClass = () => {
    return paymentStatus === 'paid' ? styles.paymentPaid : styles.paymentPending;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const handlePayNow = () => {
    if (onPayNow) onPayNow();
  };

  const handleCancelBooking = () => {
    if (onCancelBooking) onCancelBooking();
  };

  return (
    <div className={`${styles.card} ${status === 'cancelled' ? styles.cancelled : ''}`}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={roomType} className={styles.image} />
          <span className={`${styles.badge} ${getBadgeClass()}`}>{status}</span>
          {onToggleFavorite && (
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles.header}>
            <div className={styles.roomInfo}>
              <h3>{roomType}</h3>
              <p className={styles.roomLocation}>
                <MapPin size={16} /> Room {roomNumber}
              </p>
            </div>
            <div className={styles.priceContainer}>
              <p className={styles.price}>R{price}</p>
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
                <p className={styles.infoValue}>
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
            </div>
          </div>

          <div className={`${styles.paymentStatus} ${getPaymentClass()}`}>
            {paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
          </div>

          {paymentStatus === 'unpaid' && status !== 'cancelled' && (
            <button className={styles.payNowButton} onClick={handlePayNow}>
              Pay Now
            </button>
          )}

          {status === 'upcoming' && (
            <button className={styles.cancelButton} onClick={handleCancelBooking}>
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
