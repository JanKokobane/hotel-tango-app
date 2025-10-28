import React from 'react';
import { useState, useEffect } from 'react';
import { User, Edit2, Mail, Phone, Calendar, LogOut, CreditCard } from 'lucide-react';
import { BookingCard } from './BookingCard/BookingCard';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import styles from './Profile.module.css';

const mockBookings = {
  upcoming: [
    {
      id: '1',
      roomType: 'Deluxe Suite',
      roomNumber: '405',
      checkIn: '2025-11-15',
      checkOut: '2025-11-20',
      guests: 2,
      status: 'upcoming' as const,
      imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      price: 350,
    },
    {
      id: '2',
      roomType: 'Executive Room',
      roomNumber: '302',
      checkIn: '2025-12-10',
      checkOut: '2025-12-12',
      guests: 1,
      status: 'upcoming' as const,
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      price: 280,
    },
  ],
  past: [
    {
      id: '3',
      roomType: 'Presidential Suite',
      roomNumber: '1201',
      checkIn: '2025-09-05',
      checkOut: '2025-09-10',
      guests: 3,
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      price: 650,
    },
    {
      id: '4',
      roomType: 'Garden View Room',
      roomNumber: '215',
      checkIn: '2025-07-20',
      checkOut: '2025-07-25',
      guests: 2,
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      price: 220,
    },
  ],
};

export default function Profile() {
  const { user, logout, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        contact: user.contact || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    setError(null);

    try {
      await ApiService.updateProfile(user.id, formData);
      await refreshUser();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>My Profile</h1>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.coverImage} />
          <div className={styles.profileContent}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                <User size={48} />
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.profileTop}>
                  <div>
                    <h2 className={styles.userName}>
                      {formData.firstname} {formData.lastname}
                    </h2>
                    <p className={styles.memberBadge}>Premium Member</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`${styles.editButton} ${isEditing ? styles.editButtonOutline : styles.editButtonPrimary}`}
                  >
                    <Edit2 size={16} />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className={styles.contactGrid}>
                  <div className={styles.contactItem}>
                    <Mail className={styles.contactIcon} size={20} />
                    <div>
                      <p className={styles.contactLabel}>Email</p>
                      <p className={styles.contactValue}>{formData.email}</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <Phone className={styles.contactIcon} size={20} />
                    <div>
                      <p className={styles.contactLabel}>Phone</p>
                      <p className={styles.contactValue}>{formData.contact || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <Calendar className={styles.contactIcon} size={20} />
                    <div>
                      <p className={styles.contactLabel}>Member Since</p>
                      <p className={styles.contactValue}>{memberSince}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className={styles.editForm}>
                <h3 className={styles.formTitle}>Edit Information</h3>
                {error && (
                  <div style={{ color: 'hsl(var(--destructive))', marginBottom: '1rem' }}>
                    {error}
                  </div>
                )}
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstname">First Name</label>
                    <input
                      id="firstname"
                      value={formData.firstname}
                      onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      id="lastname"
                      value={formData.lastname}
                      onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact">Phone</label>
                    <input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button
                    className={`${styles.editButton} ${styles.editButtonOutline}`}
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${styles.editButton} ${styles.editButtonPrimary}`}
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Total Bookings</p>
                <p className={styles.statValue}>{user?.totalBookings || 0}</p>
              </div>
              <CreditCard className={styles.statIcon} size={40} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Upcoming</p>
                <p className={styles.statValue}>{mockBookings.upcoming.length}</p>
              </div>
              <Calendar className={styles.statIcon} size={40} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Loyalty Points</p>
                <p className={styles.statValue}>2,450</p>
              </div>
              <div className={styles.loyaltyIcon}>
                <span>★</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bookingsCard}>
          <div className={styles.bookingsHeader}>
            <h2 className={styles.bookingsTitle}>My Bookings</h2>
            <p className={styles.bookingsSubtitle}>View and manage your reservations</p>
          </div>

          <div className={styles.tabs}>
            <div className={styles.tabsList}>
              <button
                className={`${styles.tabTrigger} ${activeTab === 'upcoming' ? styles.tabTriggerActive : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming ({mockBookings.upcoming.length})
              </button>
              <button
                className={`${styles.tabTrigger} ${activeTab === 'past' ? styles.tabTriggerActive : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Stays ({mockBookings.past.length})
              </button>
            </div>

            {activeTab === 'upcoming' && (
              <div className={styles.tabContent}>
                {mockBookings.upcoming.length > 0 ? (
                  <div className={styles.bookingsList}>
                    {mockBookings.upcoming.map((booking) => (
                      <BookingCard key={booking.id} {...booking} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <Calendar className={styles.emptyIcon} size={64} />
                    <p className={styles.emptyText}>No upcoming bookings</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div className={styles.tabContent}>
                {mockBookings.past.length > 0 ? (
                  <div className={styles.bookingsList}>
                    {mockBookings.past.map((booking) => (
                      <BookingCard key={booking.id} {...booking} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <Calendar className={styles.emptyIcon} size={64} />
                    <p className={styles.emptyText}>No past bookings</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
