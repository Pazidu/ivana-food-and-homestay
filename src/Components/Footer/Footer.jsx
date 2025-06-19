import React from "react";
import "./Footer.css"; // Assuming you have a CSS file for styling

const Footer = () => (
  <footer className="footer">
    © {new Date().getFullYear()} Ivana Food & Homestay
  </footer>
);

export default Footer;
