import React, { useState } from "react";

import { Button } from "../Button/Button";
import { Text } from "../Text/Text";

export const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      email,
      message,
    });
   
  };

  return (
    <section>
      <Text variant="h2">Contact Us</Text>
      <Text   variant ="p">
        Get in touch with our team for reservations, inquiries, or special requests.
      </Text>

      <div>
    
        <div>
          <div>
            <Text variant ="h3">Address</Text>
            <Text   variant ="p">123 Luxury Avenue</Text>
            <Text   variant ="p">Downtown District</Text>
            <Text   variant ="p">City, State 12345</Text>
          </div>

          <div>
            <Text variant ="h3">Phone no:</Text>
            <Text variant ="p">0778677675</Text>
          </div>

          <div>
            <Text variant ="h3">Email:</Text>
            <Text variant ="p">info@tangohotel.com</Text>
          </div>
        </div>

        <div>
          <Text variant ="h3">Send us a Message</Text>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name & Surname</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
};
