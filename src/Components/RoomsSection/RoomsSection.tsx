import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, ArrowRight } from "lucide-react";
import standardRoom from "../../assets/images/standard-room (2).png";
import familyRoom from "../../assets/images/family-room.png";
import deluxeRoom from "../../assets/images/deluxe-room.png";
import executiveSuite from "../../assets/images/executive-suite.png";
import presidentialSuite from "../../assets/images/presidential-suite.png";
import businessRoom from "../../assets/images/business-room.png";
import styles from "./RoomsSection.module.css";

interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

const rooms: Room[] = [
  {
    id: 1,
    title: "Standard Room",
    description: "Comfortable and well-appointed room with modern amenities and city views.",
    image: standardRoom,
    badge: "POPULAR CHOICE",
  },
  {
    id: 2,
    title: "Deluxe Room",
    description: "Spacious room with premium furnishings and enhanced amenities for extra comfort.",
    image: deluxeRoom,
    badge: "BEST VALUE",
  },
  {
    id: 3,
    title: "Executive Suite",
    description:
      "Luxurious suite with separate living area and premium amenities for discerning guests.",
    image: executiveSuite,
  },
  {
    id: 4,
    title: "Presidential Suite",
    description: "The ultimate in luxury with panoramic views and exclusive amenities.",
    image: presidentialSuite,
    badge: "LUXURY",
  },
  {
    id: 5,
    title: "Family Room",
    description: "Perfect for families with connecting rooms and child-friendly amenities.",
    image: familyRoom,
  },
  {
    id: 6,
    title: "Business Room",
    description: "Designed for business travelers with work desk and meeting facilities.",
    image: businessRoom,
  },
];

export const RoomsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.heading}>Our Rooms</h2>
          <p className={styles.description}>
            Choose from our selection of beautifully designed rooms, each offering comfort and
            luxury for the perfect stay.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.findMoreBtn}>
            FIND MORE ROOMS
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev}>
          <ChevronLeft />
        </button>

        <div className={styles.carousel}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {rooms.map((room) => (
              <div key={room.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={room.image} alt={room.title} className={styles.image} />
                  {room.badge && <div className={styles.badge}>{room.badge}</div>}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.roomTitle}>{room.title}</h3>
                  <p className={styles.roomDescription}>{room.description}</p>
                  <button className={styles.button}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
