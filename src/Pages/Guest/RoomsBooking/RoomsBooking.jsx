import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import RoomsNavbar from "../../../Components/RoomsNavbar/RoomsNavbar";
import RoomsFooter from "../../../Components/RoomsFooter/RoomsFooter";
import "./RoomsBooking.css";

const localizer = momentLocalizer(moment);

const RoomsBooking = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showRooms, setShowRooms] = useState(false);

  // Guest details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [bookedEvents, setBookedEvents] = useState([]);

  // Fetch all bookings for calendar
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/all");
        const data = await res.json();
        const events = data.bookings.map((b) => ({
          title: `${b.guestName} - Booked`,
          start: new Date(b.checkIn),
          end: new Date(b.checkOut),
          allDay: true,
        }));
        setBookedEvents(events);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setBookedEvents([]);
      }
    };
    fetchBookings();
  }, []);

  const bookedDays = [];
  bookedEvents.forEach((event) => {
    const start = moment(event.start);
    const end = moment(event.end);
    for (let d = start; d.isSameOrBefore(end); d.add(1, "days")) {
      bookedDays.push(d.toDate());
    }
  });

  // const isDayBooked = (date) =>
  //   bookedDays.some((b) => moment(b).isSame(moment(date), "day"));

  // Search rooms based on selected dates
  // Search rooms based on selected dates
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`
      );

      const data = await res.json();
      setRooms(data.rooms || []);
      setShowRooms(true);
    } catch (err) {
      console.error("Failed to fetch rooms availability", err);
      alert("Failed to fetch rooms availability");
    }
  };

  // Handle booking a room
  const handleBookNow = async (room) => {
    if (!checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      alert("Please fill all details.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.id,
          checkIn,
          checkOut,
          guestName,
          guestEmail,
          guestPhone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Booking successful! ID: ${data.bookingId}`);
        setShowRooms(false);
        setGuestName("");
        setGuestEmail("");
        setGuestPhone("");

        // Refresh rooms availability after booking
        const roomsRes = await fetch(
          `http://localhost:5000/api/rooms?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`
        );
        const roomsData = await roomsRes.json();
        setRooms(roomsData.rooms || []);

        // Refresh calendar events
        setBookedEvents((prev) => [
          ...prev,
          {
            title: `${guestName} - Booked`,
            start: new Date(checkIn),
            end: new Date(checkOut),
            allDay: true,
          },
        ]);
      } else {
        alert(`❌ Booking failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="rooms-booking-page">
      <RoomsNavbar />

      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay">
          <h1>Book Your Stay at Ivana Homestay</h1>
          <p>Comfortable rooms, unforgettable experience</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-form">
        <h2>Plan Your Stay</h2>
        <form onSubmit={handleSearch} className="form-grid">
          <div className="form-control">
            <label>Check-In</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              placeholderText="Select Check-In"
              minDate={new Date()} // block past dates only
            />
          </div>
          <div className="form-control">
            <label>Check-Out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()} // block past dates + before checkIn
              placeholderText="Select Check-Out"
            />
          </div>
          <button type="submit" className="search-btn">
            Search Rooms
          </button>
        </form>
      </section>

      {/* Calendar */}
      <section className="calendar-section">
        <h2>Availability Calendar</h2>
        <Calendar
          localizer={localizer}
          events={bookedEvents}
          startAccessor="start"
          endAccessor="end"
          selectable={false}
          views={["month"]}
          style={{ height: 300, width: "90%", margin: "0 auto" }}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#800000",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
            },
          })}
        />
      </section>

      {/* Rooms Popup */}
      {showRooms && (
        <div className="rooms-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowRooms(false)}>
              ✖
            </button>
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <img src={room.image} alt={room.type} />
                  <div className="room-info">
                    <h3>{room.type} Room</h3>
                    <p>Guests: {room.guests}</p>
                    <p>Facilities: {room.facilities.join(", ")}</p>
                    <span className="price">${room.price} / night</span>
                    <p>
                      Available:{" "}
                      <strong>
                        {room.available > 0 ? room.available : "Fully Booked"}
                      </strong>
                    </p>

                    {room.available > 0 && (
                      <div className="guest-form">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                        />
                        <button
                          className="book-btn"
                          onClick={() => handleBookNow(room)}
                        >
                          Book Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <RoomsFooter />
    </div>
  );
};

export default RoomsBooking;
