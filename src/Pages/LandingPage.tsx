import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Text } from "../Components/Text/Text";
import { Input } from "../Components/Input/Input";
import { Button } from "../Components/Button/Button";
import { RoomsSection } from "../Components/RoomsSection/RoomsSection";

const LandingPage: React.FC = () => {
  return (
    <div>
      <section className="hero-section">
        <div>
          <div>
            <Text variant="h2">The Ultimate Hotel Experience</Text>
            <Text variant="h1">Discover Your Perfect Gateway Destination</Text>
          </div>

          <div>
            <div>
              <Input
                type="text"
                label="Destination"
                placeholder="Destination"
              />
            </div>

            <div>
              <Input type="date" label="Check In" />
            </div>

            <div>
              <Input type="date" label="Check Out" />
            </div>

            <div>
              <Input type="text" label="Guests" placeholder="Guests" />
            </div>

            <Button>
              <IoSearchSharp />
              Search
            </Button>
          </div>
        </div>
      </section>
      <RoomsSection/>
    </div>
  );
};

export default LandingPage;
