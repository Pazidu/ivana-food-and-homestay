import React from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import "./ContactUs.css"; // Assuming you have a CSS file for styling
import logo from "../../assets/logo.jpg"; // Replace with your actual logo path
import facebook from "../../assets/facebook.png"; // Replace with your actual Facebook icon path
import instagram from "../../assets/instagram.png"; // Replace with your actual Instagram icon path
import whatsapp from "../../assets/whatsapp.png"; // Replace with your actual WhatsApp icon path
import tiktok from "../../assets/tiktok.png"; // Replace with your actual TikTok icon path
import email from "../../assets/gmail.png"; // Replace with your actual Email icon path

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
            <img src={logo} alt="" className="contactUsLogoImage" />
            <hr />
            <h5>
              <AddLocationIcon /> {"  "} 3/7, Sirimalwatta road, Arangala, Kandy
            </h5>
            {/* <h5>
              <EmailIcon />
              {"  "} ivanafoods@gmail.com
            </h5> */}
          </div>
          <hr />
          <div className="findUS">
            <h1 className="findusonText">Find Us On</h1>

            <div className="socialIcons">
              <a
                href="https://www.facebook.com/share/1Co4BqtoSo/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="" className="socialMediaImage" />
              </a>

              <a
                href="https://www.instagram.com/ivana_food_court?igsh=MTlyeXI3OWx3aHZtYQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="" className="socialMediaImage" />
              </a>

              <a
                href="https://wa.me/94779815386"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp} alt="" className="socialMediaImage" />
              </a>

              <a
                href="https://www.tiktok.com/@ivanafoodcourt?_r=1&_t=ZS-91WGG8leiqG"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={tiktok} alt="" className="socialMediaImage" />
              </a>

              <a
                href="mailto:ivanafoodcourt3.7@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={email} alt="" className="socialMediaImage" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
