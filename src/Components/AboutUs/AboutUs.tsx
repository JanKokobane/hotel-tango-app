import React from "react";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";

const AboutUs: React.FC = () => {
  return (
    <section>
      <Text variant="h2">About Tango Hotel</Text>

      <Text variant="p">
        Located in the heart of the city, Tango Hotel offers an unparalleled
        blend of luxury, comfort, and convenience. Our commitment to exceptional
        service and attention to detail ensures every guest enjoys a memorable
        stay.
      </Text>

      <Text variant="p">
        With elegantly appointed rooms, world-class amenities, and a prime
        location, we provide the perfect base for both business and leisure
        travelers.
      </Text>
      
      <Button>Read More</Button>
    </section>
  );
};

export default AboutUs;
