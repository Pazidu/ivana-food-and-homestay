import React from "react";
import "./RoomsFooter.css";
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const RoomsFooter = () => {
  return (
    <footer className="rooms-footer">
      <div className="footer-container">
        
        {/* Address + Map */}
        <div className="footer-section">
          <h3>Our Location</h3>
          <p>
            <FaMapMarkerAlt /> Ivana Food and Homestay, Kandy, Sri Lanka
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5803633698642!2d80.66677497465189!3d7.28849209271893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3670079f8e0b1%3A0x455a50a07a333431!2sIvana%20Food%20Court!5e0!3m2!1sen!2slk!4v1749564798460!5m2!1sen!2slk"
            width="450"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </p>
          <p>
            <a
              href="https://www.facebook.com/YourPage"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <FaFacebook /> Facebook
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Ivana Food and Homestay. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default RoomsFooter;
