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
            <FaMapMarkerAlt /> Ivana Food and Homestay, Jaffna, Sri Lanka
          </p>
          <iframe
            title="Ivana Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.517229853!2d79.991!3d9.661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe54d4cfdcb5e7%3A0x1d59b2f5ec9d5f5!2sJaffna!5e0!3m2!1sen!2slk!4v1694000000000"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
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
