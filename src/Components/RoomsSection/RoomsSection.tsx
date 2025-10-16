import React from "react";
import standardRoom from "../assets/images/standard-room.png";

import familyRoom from "../assets/images/family-room.png";
import deluxeRoom from "../assets/images/deluxe-room.png";
import executiveSuite from "../assets/images/executive-suite.png";
import presidentialSuite from "../assets/images/presidential-suite.png";
import businessRoom from "../assets/images/business-room.png"; 


interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
}

const rooms: Room[] = [
  {
    id: 1,
    title: "Standard Room",
    description: "Comfortable and well-appointed room with modern amenities and city views.",
    image: standardRoom,
  },
  {
    id: 2,
    title: "Deluxe Room",
    description: "Spacious room with premium furnishings and enhanced amenities for extra comfort.",
    image: deluxeRoom,
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
  return (
    <section>
      <h2>Our Rooms</h2>
      <p>
        Choose from our selection of beautifully designed rooms, each offering comfort and luxury
        for the perfect stay.
      </p>

      <div>
        {rooms.map((room) => (
          <div key={room.id}>
            <img src={room.image} alt={room.title} />
            <h3>{room.title}</h3>
            <p>{room.description}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};
