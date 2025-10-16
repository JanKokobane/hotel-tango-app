import React from "react";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { Text } from "../Text/Text";

const Navbar: React.FC = () => {
  return (
    <nav>
      <Text variant="h1">Tango</Text>

      <div>
        <>
          <Link to="">
            <span>Home</span>
          </Link>

          <Link to="">
            <span>About</span>
          </Link>

          <Link to="">
            <span>Rooms</span>
          </Link>

          <Link to="">
            <span>Experience</span>
          </Link>

          <Link to="">
            <span>Contact Us</span>
          </Link>
          <Link to="">
            <Button>Login</Button>
          </Link>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
