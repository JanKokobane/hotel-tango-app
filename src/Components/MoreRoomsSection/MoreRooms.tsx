import React from "react";

import superiorRoom from '../../assets/images/suuperior.jpg';
import deluxeRoom from '../../assets/images/de3luxe.jpg';
import familyRoom from '../../assets/images/familyy.jpg';
import standardRoom from '../../assets/images/standarr.jpg';
import executiveSuite from '../../assets/images/executive_suite.jpg';
import juniorSuite from '../../assets/images/junior_suite.jpg';
import superiorRoom2 from '../../assets/images/superr.jpg';
import superiorRoom3 from '../../assets/images/superior.jpg';
import superiorRoom4 from '../../assets/images/superior_room.jpg';
import superiorRoom5 from '../../assets/images/sup3rior.jpg';
import deluxeRoom2 from '../../assets/images/dlux3.jpg';
import deluxeRoom3 from '../../assets/images/deeluxe.jpg';
import deluxeRoom4 from '../../assets/images/deluxe.jpg';
import deluxeRoom5 from '../../assets/images/deluxe_room.jpg';
import standardRoom2 from '../../assets/images/standardd.jpg';
import standardRoom3 from '../../assets/images/standard_room.jpg';
import standardRoom4 from '../../assets/images/standard.jpg';
import familyRoom2 from '../../assets/images/family.jpg';
import familyRoom3 from '../../assets/images/family_room.jpg';

interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
}

const rooms: Room[] = [
  {
    id: 1,
    title: "Superior Room",
    description: "Elegant and comfortable, designed for guests seeking a relaxing stay.",
    image: superiorRoom,
  },
  {
    id: 2,
    title: "Deluxe Room",
    description: "Spacious and stylish with upgraded amenities and a modern finish.",
    image: deluxeRoom,
  },
  {
    id: 3,
    title: "Family Room",
    description: "Perfect for families, featuring multiple beds and a cozy seating area.",
    image: familyRoom,
  },
  {
    id: 4,
    title: "Standard Room",
    description: "A well-equipped room offering comfort and convenience for short stays.",
    image: standardRoom,
  },
  {
    id: 5,
    title: "Executive Suite",
    description: "Premium suite for business or leisure with private lounge and workspace.",
    image: executiveSuite,
  },
  {
    id: 6,
    title: "Junior Suite",
    description: "Charming suite with a sitting area, ideal for longer or special stays.",
    image: juniorSuite,
  },

  {
    id: 7,
    title: "Superior Room",
    description: "Elegant and comfortable, designed for guests seeking a relaxing stay.",
    image: superiorRoom2,
  },
  {
    id: 8,
     title: "Superior Room",
    description: "Elegant and comfortable, designed for guests seeking a relaxing stay.",
    image: superiorRoom3,
  },
  {
    id: 9,
    title: "Superior Room",
    description: "Elegant and comfortable, designed for guests seeking a relaxing stay.",
    image: superiorRoom4,
  },
  {
    id: 10,
    title: "Superior Room",
    description: "Elegant and comfortable, designed for guests seeking a relaxing stay.",
    image: superiorRoom5,
  },

  {
    id: 11,
    title: "Deluxe Room",
    description: "Spacious and stylish with upgraded amenities and a modern finish.",
    image: deluxeRoom2,
  },
  {
    id: 12,
    title: "Deluxe Room",
    description: "Spacious and stylish with upgraded amenities and a modern finish.",
    image: deluxeRoom3,
  },
  {
    id: 13,
    title: "Deluxe Room",
    description: "Spacious and stylish with upgraded amenities and a modern finish.",
    image: deluxeRoom4,
  },
  {
    id: 14,
    title: "Deluxe Room",
    description: "Spacious and stylish with upgraded amenities and a modern finish.",
    image: deluxeRoom5,
  },

  {
    id: 15,
    title: "Standard Room",
    description: "A well-equipped room offering comfort and convenience for short stays.",
    image: standardRoom2,
  },
  {
    id: 16,
    title: "Standard Room",
    description: "A well-equipped room offering comfort and convenience for short stays.",
    image: standardRoom3,
  },
  {
    id: 17,
    title: "Standard Room",
    description: "A well-equipped room offering comfort and convenience for short stays.",
    image: standardRoom4,
  },

  {
    id: 18,
    title: "Family Room",
    description: "Perfect for families, featuring multiple beds and a cozy seating area.",
    image: familyRoom2,
  },
  {
    id: 19,
    title: "Family Room",
    description: "Perfect for families, featuring multiple beds and a cozy seating area.",
    image: familyRoom3,
  },
];

const MoreRooms: React.FC = () => {
  return (
    <div>
      <h2>More Rooms</h2>
      {rooms.map((room) => (
        <div key={room.id}>
          <img src={room.image} alt={room.title} />
          <h3>{room.title}</h3>
          <p>{room.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MoreRooms;
