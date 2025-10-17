
import React from 'react';
import { Text } from "../Text/Text";

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <div>
          <Text variant="h2">TANGO</Text>
          <div>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

        <div>
          <Text variant="h3">Quick Links</Text>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Rooms</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <Text variant = "h3">Contact Info</Text>
          <Text variant = "p">123 Luxury Avenue, Downtown</Text>
          <Text variant = "p">Phone: 27 645 123 4567</Text>
          <Text variant = "p">Email: info@tangohotels.com</Text>
        </div>
<div>
  <img src="/assets/map.png" alt="Map Icon" />
</div>
      </div>

      <div>
        <Text variant = "p">©2025 Tango Hotel. All rights reserved | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></Text>
      </div>
    </footer>
  );
};

export default Footer;
