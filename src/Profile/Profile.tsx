import React, { useState, useEffect } from "react";
import {
  User,
  Upload,
  Edit,
  Info,
  LogOut,
  Loader,
  Trash2,
  CheckCircle,
  Clock,
  Calendar,
  Bell,
} from "lucide-react";
import { BookingCard } from "./BookingCard/BookingCard";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import styles from "./Profile.module.css";

interface Booking {
  id: string;
  room_id: number;
  room_name?: string;
  room_image?: string;
  full_name: string;
  phone: string;
  email: string;
  check_in: string;
  check_out: string;
  nights: number;
  total_price: string;
  created_at: string;
  status?: "upcoming" | "completed";
}

type TabView = "history" | "new" | "favourites" | "settings";

type NotificationItem = {
  id: number;
  message: string;
  type: string;
  date: string;
  booking?: Booking;
};

const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [currentTab, setCurrentTab] = useState<TabView>("history");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || null
  );
  const [coverImage, setCoverImage] = useState<string | null>(
    user?.coverImage || null
  );
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    contact: user?.contact || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const storageKey = user?.email ? `notifications_${user.email}` : null;

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
      });
      setProfileImage(user.profileImage || null);
      setCoverImage(user.coverImage || null);

      try {
        if (storageKey) {
          const raw = localStorage.getItem(storageKey);
          setNotifications(raw ? JSON.parse(raw) : []);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Failed to load notifications:", err);
        setNotifications([]);
      }
    } else {
      setNotifications([]);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(notifications));
    } catch (err) {
      console.error("Failed to save notifications:", err);
    }
  }, [notifications, storageKey]);

  const addNotification = (message: string, type: string = "info", booking?: Booking) => {
    if (!user?.email) return;
    const newNotif: NotificationItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      message,
      type,
      date: new Date().toISOString(),
      booking,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user?.email) return;
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://tango-hotel-backend.onrender.com/api/bookings/user/${encodeURIComponent(
            user.email
          )}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          const now = new Date();
          const enriched: Booking[] = data.map((b: any) => {
            const checkOut = new Date(b.check_out);
            return {
              ...b,
              status: checkOut >= now ? "upcoming" : "completed",
              room_image:
                b.room_image ||
                "https://via.placeholder.com/400x250?text=No+Image",
            };
          });

          const oldIds = bookings.map((b) => b.id);
          const newIds = enriched.map((b) => b.id);

          const addedIds = newIds.filter((id) => !oldIds.includes(id));
          const removedIds = oldIds.filter((id) => !newIds.includes(id));

          addedIds.forEach((id) => {
            const booking = enriched.find((b) => b.id === id);
            if (booking) addNotification("You have a new booking.", "booking", booking);
          });

          removedIds.forEach((id) => {
            addNotification("A booking was removed or cancelled.", "booking");
          });

          setBookings(enriched);
        } else {
          if (bookings.length > 0) {
            addNotification("Your bookings list is now empty.", "booking");
          }
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, [user?.email]);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setCoverImage(imageData);
        updateProfile({ coverImage: imageData });
        setSuccessMessage("Cover photo updated successfully");
        addNotification("Cover photo updated.", "profile");
        setTimeout(() => setSuccessMessage(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setProfileImage(imageData);
        updateProfile({ profileImage: imageData });
        setSuccessMessage("Profile photo updated successfully");
        addNotification("Profile photo updated.", "profile");
        setTimeout(() => setSuccessMessage(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateProfile({
        ...formData,
        profileImage,
        coverImage,
      });
      setSuccessMessage("Profile updated successfully");
      addNotification("Profile details updated.", "profile");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    setNotifications([]);
    logout();
  };

  const getTabBookings = () => {
    switch (currentTab) {
      case "new":
        return bookings.filter((b) => b.status === "upcoming");
      case "favourites":
        return bookings.slice(0, 7);
      default:
        return bookings.filter((b) => b.status === "completed");
    }
  };

  const tabBookings = getTabBookings();
  const upcomingCount = bookings.filter((b) => b.status === "upcoming").length;
  const historyCount = notifications.length;
  const favouritesCount = 7;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "booking":
        return <Calendar size={16} />;
      case "profile":
        return <User size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "booking":
        return styles.typeBadgeBooking;
      case "profile":
        return styles.typeBadgeProfile;
      default:
        return styles.typeBadgeInfo;
    }
  };

  return (
    <div className={`${styles.profileContainer} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.profileWrapper}>
        <div className={styles.coverSection}>
          <div
            className={styles.coverImage}
            style={{
              backgroundImage: coverImage
                ? `url(${coverImage})`
                : "linear-gradient(135deg, #07070a6c 0%, #19112069 100%), url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            }}
          >
            <label className={styles.uploadButton}>
              <Upload size={20} />
              <span>Upload Cover Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className={styles.profileInfoSection}>
            <div className={styles.profileLeft}>
              <div className={styles.avatarWrapper}>
                <label className={styles.avatarLabel}>
                  <div
                    className={styles.avatar}
                    style={{
                      backgroundImage: profileImage ? `url(${profileImage})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!profileImage && <User size={64} />}
                  </div>
                  <div className={styles.avatarUploadHint}>
                    <Upload size={16} />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <div className={styles.userDetails}>
                <div className={styles.nameRow}>
                  <h1 className={styles.userName}>
                    {formData.firstname} {formData.lastname}
                  </h1>
                  <button
                    className={styles.editButton}
                    onClick={() => setCurrentTab("settings")}
                  >
                    <Edit size={16} />
                  </button>
                </div>
                <div className={styles.locationRow}>
                  <span className={styles.locationText}>
                    {formData.contact || "Location not set"}
                  </span>
                </div>
              </div>
            </div>

            <button className={styles.moreButton} onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <nav className={styles.tabs}>
            <button
              className={`${styles.tab} ${currentTab === "history" ? styles.tabActive : ""}`}
              onClick={() => setCurrentTab("history")}
            >
              Notifications ({historyCount})
            </button>
            <button
              className={`${styles.tab} ${currentTab === "new" ? styles.tabActive : ""}`}
              onClick={() => setCurrentTab("new")}
            >
              New Bookings ({upcomingCount})
            </button>
            <button
              className={`${styles.tab} ${currentTab === "favourites" ? styles.tabActive : ""}`}
              onClick={() => setCurrentTab("favourites")}
            >
              My Favourites ({favouritesCount})
            </button>
            <button
              className={`${styles.tab} ${currentTab === "settings" ? styles.tabActive : ""}`}
              onClick={() => setCurrentTab("settings")}
            >
              Account Settings
            </button>
          </nav>
        </div>

        <div className={styles.contentSection}>
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

          {currentTab === "settings" ? (
            <div className={styles.settingsContent}>
              <div className={styles.settingsHeader}>
                <h2>Account Settings</h2>
                <p>Update your profile information</p>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.formTitle}>Personal Information</h3>
                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstname">First Name</label>
                    <input
                      id="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={(e) =>
                        setFormData({ ...formData, firstname: e.target.value })
                      }
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      id="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={(e) =>
                        setFormData({ ...formData, lastname: e.target.value })
                      }
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact">Phone / Location</label>
                    <input
                      id="contact"
                      type="text"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      placeholder="Enter phone or location"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader size={16} className={styles.spinIcon} />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : currentTab === "history" ? (
            <div className={styles.notificationsContent}>
              <div className={styles.overviewSection}>
                <h2 className={styles.overviewTitle}>Overview</h2>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Calendar size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{upcomingCount}</div>
                      <div className={styles.statLabel}>Upcoming Bookings</div>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{completedCount}</div>
                      <div className={styles.statLabel}>Completed Stays</div>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Bell size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{notifications.length}</div>
                      <div className={styles.statLabel}>Notifications</div>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{bookings.length}</div>
                      <div className={styles.statLabel}>Total Bookings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.notificationsHeader}>
                <h2>Notifications</h2>
                <div className={styles.notificationsActions}>
                  <button
                    className={styles.clearButton}
                    onClick={() => {
                      if (confirm("Clear all notifications?")) clearNotifications();
                    }}
                    disabled={notifications.length === 0}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {notifications.length > 0 ? (
                <div className={styles.tableContainer}>
                  <table className={styles.notificationsTable}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.map((n) => (
                        <tr key={n.id} className={styles.notificationRow}>
                          <td>
                            <div className={`${styles.typeBadge} ${getTypeBadgeClass(n.type)}`}>
                              {getTypeIcon(n.type)}
                              <span>{n.type}</span>
                            </div>
                          </td>
                          <td>
                            <div className={styles.messageCell}>
                              <p className={styles.notifMessage}>{n.message}</p>
                              {n.booking && (
                                <div className={styles.bookingPreview}>
                                  <span className={styles.bookingInfo}>
                                    {n.booking.room_name || `Room #${n.booking.room_id}`} -
                                    Check-in: {new Date(n.booking.check_in).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={styles.dateCell}>
                              {new Date(n.date).toLocaleDateString()}
                              <span className={styles.timeCell}>
                                {new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </span>
                          </td>
                          <td>
                            <button
                              className={styles.deleteButton}
                              onClick={() => deleteNotification(n.id)}
                              title="Delete notification"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <Info size={48} className={styles.emptyIcon} />
                  <h3>No notifications</h3>
                  <p>We'll show account and booking updates here.</p>
                </div>
              )}
            </div>
          ) : isLoading ? (
            <div className={styles.loadingState}>
              <Loader size={40} className={styles.spinIcon} />
              <p>Loading bookings...</p>
            </div>
          ) : (
            <div className={styles.bookingsGrid}>
              {tabBookings.length > 0 ? (
                tabBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    roomType={booking.room_name || `Room #${booking.room_id}`}
                    roomNumber={String(booking.room_id)}
                    checkIn={booking.check_in}
                    checkOut={booking.check_out}
                    guests={1}
                    status={booking.status || "upcoming"}
                    price={Number(booking.total_price)}
                    imageUrl={booking.room_image || ""}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No bookings found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
