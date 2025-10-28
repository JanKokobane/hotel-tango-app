import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  CreditCard,
  Moon,
  Sun,
  LayoutDashboard,
  CalendarDays,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";
import { BookingCard } from "./BookingCard/BookingCard";
import { useAuth } from "../context/AuthContext";
import { ApiService } from "../services/api";
import { useDarkMode } from "../context/DarkModeContext";
import styles from "./Profile.module.css";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "./ui/sidebar";
import { SidebarTrigger } from "./ui/sidebar";

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

type DashboardView = "overview" | "bookings" | "notifications" | "settings";

interface Notification {
  id: string;
  type: "info" | "success" | "warning";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const Profile: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
      });
    }
  }, [user]);

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
          const enriched = data.map((b) => {
            const checkOut = new Date(b.check_out);
            return {
              ...b,
              status: checkOut >= now ? "upcoming" : "completed",
              room_image:
                b.room_image ||
                "https://via.placeholder.com/400x250?text=No+Image",
            };
          });
          setBookings(enriched);

          // Create notifications for new bookings
          if (enriched.length > 0) {
            const newNotifications: Notification[] = enriched
              .filter((b) => b.status === "upcoming")
              .slice(0, 3)
              .map((b) => ({
                id: `booking-${b.id}`,
                type: "success" as const,
                title: "Booking Confirmed",
                message: `Your booking for ${
                  b.room_name || `Room #${b.room_id}`
                } is confirmed`,
                timestamp: new Date(b.created_at),
                read: false,
              }));
            setNotifications(newNotifications);
          }
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, [user?.email]);

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const past = bookings.filter((b) => b.status === "completed");

  const handleSave = async () => {
    if (!user?.id) return;
    setIsSaving(true);
    setError(null);
    try {
      await ApiService.updateProfile(user.id, formData);
      await refreshUser();

      // Add success notification
      const newNotification: Notification = {
        id: `profile-update-${Date.now()}`,
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      console.error("Error updating profile:", err);

      // Add error notification
      const errorNotification: Notification = {
        id: `profile-error-${Date.now()}`,
        type: "warning",
        title: "Update Failed",
        message:
          err instanceof Error ? err.message : "Failed to update profile",
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [errorNotification, ...prev]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => logout();

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderBookingCards = (list: Booking[]) =>
    list.length > 0 ? (
      <div className={styles.bookingsList}>
        {list.map((booking) => (
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
            imageUrl={
              booking.room_image ||
              "https://via.placeholder.com/400x250?text=No+Image"
            }
          />
        ))}
      </div>
    ) : (
      <div className={styles.emptyState}>
        <Calendar className={styles.emptyIcon} size={64} />
        <p className={styles.emptyText}>
          {activeTab === "upcoming"
            ? "No upcoming bookings"
            : "No past bookings"}
        </p>
      </div>
    );

  const renderOverview = () => (
    <div className={styles.overviewContent}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome Back, {formData.firstname}!
        </h1>
        <p className={styles.welcomeSubtitle}>
          Manage your bookings and account settings
        </p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div>
              <p className={styles.statLabel}>TOTAL BOOKINGS</p>
              <p className={styles.statValue}>{bookings.length}</p>
            </div>
            <CreditCard className={styles.statIcon} size={40} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div>
              <p className={styles.statLabel}>UPCOMING</p>
              <p className={styles.statValue}>{upcoming.length}</p>
            </div>
            <Calendar className={styles.statIcon} size={40} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div>
              <p className={styles.statLabel}>LOYALTY POINTS</p>
              <p className={styles.statValue}>2,450</p>
            </div>
            <div className={styles.loyaltyIcon}>
              <span>★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.coverImage} />
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              <User size={48} />
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.userName}>
                {formData.firstname} {formData.lastname}
              </h2>
              <p className={styles.memberBadge}>Premium Member</p>

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
                    <p className={styles.contactValue}>
                      {formData.contact || "Not provided"}
                    </p>
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
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className={styles.bookingsContent}>
      <div className={styles.bookingsHeader}>
        <h2 className={styles.bookingsTitle}>My Bookings</h2>
        <p className={styles.bookingsSubtitle}>
          View and manage your reservations
        </p>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabsList}>
          <button
            className={`${styles.tabTrigger} ${
              activeTab === "upcoming" ? styles.tabTriggerActive : ""
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming ({upcoming.length})
          </button>
          <button
            className={`${styles.tabTrigger} ${
              activeTab === "past" ? styles.tabTriggerActive : ""
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past Stays ({past.length})
          </button>
        </div>

        {isLoading ? (
          <div className={styles.emptyState}>
            <p>Loading bookings...</p>
          </div>
        ) : activeTab === "upcoming" ? (
          renderBookingCards(upcoming)
        ) : (
          renderBookingCards(past)
        )}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className={styles.notificationsContent}>
      <div className={styles.notificationsHeader}>
        <h2 className={styles.notificationsTitle}>Notifications</h2>
        {unreadCount > 0 && (
          <button className={styles.markAllRead} onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className={styles.emptyState}>
          <Bell className={styles.emptyIcon} size={64} />
          <p className={styles.emptyText}>No notifications yet</p>
        </div>
      ) : (
        <div className={styles.notificationsList}>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`${styles.notificationCard} ${
                notif.read ? styles.notificationRead : ""
              }`}
              onClick={() => markNotificationAsRead(notif.id)}
            >
              <div
                className={`${styles.notificationIcon} ${
                  styles[
                    `notification${
                      notif.type.charAt(0).toUpperCase() + notif.type.slice(1)
                    }`
                  ]
                }`}
              >
                <Bell size={20} />
              </div>
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationTitle}>{notif.title}</h3>
                <p className={styles.notificationMessage}>{notif.message}</p>
                <p className={styles.notificationTimestamp}>
                  {notif.timestamp.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {!notif.read && <div className={styles.unreadBadge} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className={styles.settingsContent}>
      <div className={styles.settingsHeader}>
        <h2 className={styles.settingsTitle}>Account Settings</h2>
        <p className={styles.settingsSubtitle}>
          Update your profile information
        </p>
      </div>

      <div className={styles.settingsCard}>
        <h3 className={styles.formTitle}>Personal Information</h3>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
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
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact">Phone</label>
            <input
              id="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
          </div>
        </div>
        <div className={styles.formActions}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
        <Sidebar className={styles.sidebar}>
          <SidebarHeader className={styles.sidebarHeader}>
            <div className={styles.logo}>Guest Portal</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentView === "overview"}
                  onClick={() => setCurrentView("overview")}
                  className={currentView === "overview" ? styles.activeNav : ""}
                >
                  <LayoutDashboard size={20} />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentView === "bookings"}
                  onClick={() => setCurrentView("bookings")}
                  className={currentView === "bookings" ? styles.activeNav : ""}
                >
                  <CalendarDays size={20} />
                  <span>My Bookings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentView === "notifications"}
                  onClick={() => setCurrentView("notifications")}
                  className={
                    currentView === "notifications" ? styles.activeNav : ""
                  }
                >
                  <Bell size={20} />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className={styles.notificationBadge}>
                      {unreadCount}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentView === "settings"}
                  onClick={() => setCurrentView("settings")}
                  className={currentView === "settings" ? styles.activeNav : ""}
                >
                  <SettingsIcon size={20} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className={styles.sidebarFooter}>
            <div className={styles.userSection}>
              <div className={styles.userAvatar}>
                <User size={24} />
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userNameFooter}>
                  {formData.firstname} {formData.lastname}
                </p>
                <p className={styles.userRole}>Premium Member</p>
              </div>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <SidebarTrigger />
            <button
              className={styles.darkModeToggle}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>

          <div className={styles.content}>
            {currentView === "overview" && renderOverview()}
            {currentView === "bookings" && renderBookings()}
            {currentView === "notifications" && renderNotifications()}
            {currentView === "settings" && renderSettings()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
