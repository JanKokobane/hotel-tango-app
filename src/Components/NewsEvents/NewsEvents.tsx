import React from "react";
import { Text } from "../Text/Text";
import cuttingBoardImg from "../../assets/cuttingBoard.png";
import tableSettingImg from '../../assets/tableSettingImg.png'

type EventItem = {
  date: string;
  title: string;
  image: string;
  description: string;
  link: string;
};

const events: EventItem[] = [
  {
    date: "December 15, 2024",
    title: "New Year's Eve Gala Dinner",
    image: cuttingBoardImg,
    description:
      "Join us for an unforgettable New Year's Eve celebration with live music, gourmet dining, and spectacular fireworks.",
    link: "#",
  },
  {
    date: "December 10, 2024",
    title: "Top 10 Local Attractions",
    image: tableSettingImg,
    description:
      "Discover the best attractions and hidden gems near Tango Hotel for an enriching cultural experience.",
    link: "#",
  },
  {
    date: "December 10, 2024",
    title: "Top 10 Local Attractions",
    image: tableSettingImg,
    description:
      "Discover the best attractions and hidden gems near Tango Hotel for an enriching cultural experience.",
    link: "#",
  },
];

const LatestNewsEvents: React.FC = () => {
  return (
    <section>
      <Text variant="h1">Latest News & Events</Text>

      <Text variant="p">
        Stay updated with the latest happenings at Tango Hotel and discover
        local attractions
      </Text>

      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <Text variant="h2">
              {event.date} - {event.title}
            </Text>
            <img alt={event.image} />
            <Text variant="p">{event.description}</Text>
            <a href={event.link}>Read More →</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestNewsEvents;
