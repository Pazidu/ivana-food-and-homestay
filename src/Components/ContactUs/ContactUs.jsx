import React from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import EmailIcon from "@mui/icons-material/Email";
import "./ContactUs.css"; // Assuming you have a CSS file for styling

function ContactUs() {
  return (
    <div>
      <div className="contactUsContainer">
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5803633698642!2d80.66677497465189!3d7.28849209271893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3670079f8e0b1%3A0x455a50a07a333431!2sIvana%20Food%20Court!5e0!3m2!1sen!2slk!4v1749564798460!5m2!1sen!2slk"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="social">
          <div className="contactUs">
            <h1>Contact Us</h1>
            <hr />
            <p>
              {/* <AddLocationIcon /> {"  "} No 1, Colombo Road, Kandy, Sri Lanka */}
            </p>
            <p>{/* <LocalPhoneIcon /> +94 77 123 4567 */}</p>
            <p>{/* <EmailIcon /> ivanafoods@gmail.com */}</p>
          </div>
          <hr />
          <div className="findUS">
            <h1>Find Us On</h1>
            <hr />
            <div className="socialIcons">
              <a
                href="https://www.facebook.com/IvanaFoodCourt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/ivanacourt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://www.twitter.com/IvanaFoodCourt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
              {/* <a
                href="https://www.twitter.com/IvanaFoodCourt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-tiktok"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
