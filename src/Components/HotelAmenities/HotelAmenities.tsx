import React from 'react';
import { Text } from '../Text/Text';
import { FaSwimmingPool, FaSpa } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { MdLocalDining } from "react-icons/md";

interface Amenity {
  icon: any;
  title: string;
  description: string;
}

const amenities: Amenity[] = [
  {
    icon: <FaSwimmingPool />,
    title: 'Swimming Pool',
    description: 'Outdoor pool with city views and poolside service.',
  },
  {
    icon: <IoIosFitness />,
    title: 'Fitness Center',
    description: '24/7 access to modern equipment and personal trainers.',
  },
  {
    icon: <MdLocalDining />,
    title: 'Fine Dining',
    description: 'Multiple restaurants serving international cuisine.',
  },
  {
    icon: <FaSpa />,
    title: 'Spa & Wellness',
    description: 'Full-service spa with massage and beauty treatments.',
  },
];

const HotelAmenities: React.FC = () => {
  return (
    <section>
      <Text variant='h1'>Hotel Amenities</Text>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index}>
            <span>{amenity.icon}</span>
            <Text variant='h2'>{amenity.title}</Text>
            <Text variant='p'>{amenity.description}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HotelAmenities;