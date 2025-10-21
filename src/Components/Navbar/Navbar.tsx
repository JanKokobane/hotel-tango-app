import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import styles from "./Navbar.module.css";
import logo from "../../assets/Logo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.centerLinks}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#rooms">Rooms</a>
          <a href="#experience">Experience</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div className={styles.rightButton}>
          <button className={styles.loginButton}>
            <User size={24} /> <span className={styles.loginText}>Login</span>
          </button>
        </div>
        <div className={styles.rightButton}>
          <button className={styles.bookNow}>Book Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
