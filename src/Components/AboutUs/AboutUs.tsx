import React from "react";
import { Button } from "../Button/Button";
import styles from "./AboutUs.module.css";
import aboutUsImage from "../../assets/aboutusBackground.png";

const AboutUs: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.imageWrapper}>
        <img src={aboutUsImage} alt="About Tango Hotel" className={styles.aboutImage} />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Our Hotels</h2>
        <p className={styles.description}>
          City Lodge Hotels offers conveniently located properties in urban centres in South Africa and one each in Windhoek, Namibia; Gaborone, Botswana and Maputo, Mozambique. Our hotels offer budget and luxurious options, with brands Courtyard Hotel, City Lodge Hotel, Town Lodge and Road Lodge, set apart through their locations, features and amenities.
        </p>
        <p className={styles.description}>
          Enjoy affordable rates, reliable WiFi, meeting rooms, tasty meals and friendly, professional hospitality from our staff. All our hotels feature comfortable rooms, secure parking and easy access to major roads, making them ideal for business and leisure travellers.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
