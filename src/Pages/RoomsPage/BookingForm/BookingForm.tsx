import React, { useState } from "react";
import {
  X,
  Sparkles,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { Calendar } from "../../../Components/ui/Calender";
import styles from "./BookingForm.module.css";

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string;
  image: string;
  status: string;
  rating?: number;
  reviews?: number;
}

interface BookingFormProps {
  room: Room;
  onClose: () => void;
}

const BookingForm = ({ room, onClose }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate stay duration
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * room.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!checkIn || !checkOut || !fullName || !phone || !email) {
      setError("Please fill in all required fields and select valid dates.");
      setLoading(false);
      return;
    }

    const bookingData = {
      room_id: Number(room.id),
      room_name: room.name, // ✅ include room name
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      check_in: checkIn.toISOString().split("T")[0],
      check_out: checkOut.toISOString().split("T")[0],
      total_price: totalPrice,
      nights,
    };

    try {
      const res = await fetch(
        "https://tango-hotel-backend.onrender.com/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Server response:", text);
        setError(`Booking failed: ${res.statusText}`);
        setLoading(false);
        return;
      }

      const result = await res.json();
      alert(
        `✅ Booking confirmed for ${room.name}! Reference: ${
          result.booking?.id || "N/A"
        }`
      );
      onClose();
    } catch (err) {
      console.error("❌ Booking error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundOverlay} />

      <button className={styles.closeButton} onClick={onClose} type="button">
        <X size={20} />
      </button>

      <div className={styles.contentWrapper}>
        <div className={styles.brandSection}>
          <h1 className={styles.brandTitle}>Complete Your Booking</h1>
          <div className={styles.tagline}>
            <Sparkles className={styles.sparkleIcon} size={14} />
            <span>Luxury Experience Awaits</span>
            <Sparkles className={styles.sparkleIcon} size={14} />
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.roomName}>{room.name}</h2>
            <p className={styles.formSubtitle}>Room #{room.id}</p>
            <p className={styles.formSubtitle}>R{room.price} per night</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.generalError}>{error}</p>}

            {/* Full Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <User size={14} />
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={styles.input}
                required
              />
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Phone size={14} />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className={styles.input}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Mail size={14} />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.divider}>
              <span>Select Dates</span>
            </div>

            {/* Check-in / Check-out */}
            <div className={styles.dateRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <CalendarIcon size={14} />
                  Check-in
                </label>
                <div className={styles.calendarWrapper}>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <CalendarIcon size={14} />
                  Check-out
                </label>
                <div className={styles.calendarWrapper}>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => !checkIn || date <= checkIn}
                    initialFocus
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            {nights > 0 && (
              <div className={styles.priceBreakdown}>
                <div className={styles.breakdownRow}>
                  <span>
                    R{room.price} × {nights} night{nights > 1 ? "s" : ""}
                  </span>
                  <span>R{room.price * nights}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Service fee</span>
                  <span>R0</span>
                </div>
                <div className={styles.breakdownTotal}>
                  <span>Total</span>
                  <span>R{totalPrice}</span>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>

        <div className={styles.footer}>
          <p>Secure payment • Instant confirmation • 24/7 support</p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
