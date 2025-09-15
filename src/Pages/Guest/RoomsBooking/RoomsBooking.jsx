import React, { useState } from "react";
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
  const [guests, setGuests] = useState(1);

  // Example booked dates
  const bookedEvents = [
    {
      title: "Booked",
      start: new Date(2025, 8, 5),
      end: new Date(2025, 8, 7),
      allDay: true,
    },
    {
      title: "Booked",
      start: new Date(2025, 8, 12),
      end: new Date(2025, 8, 14),
      allDay: true,
    },
  ];

  // Flatten booked days for disabling in datepicker
  const bookedDays = [];
  bookedEvents.forEach((event) => {
    const start = moment(event.start);
    const end = moment(event.end);
    for (let d = start; d.isSameOrBefore(end); d.add(1, "days")) {
      bookedDays.push(d.toDate());
    }
  });

  const isDayBooked = (date) => {
    return bookedDays.some((booked) =>
      moment(booked).isSame(moment(date), "day")
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    alert(
      `Searching rooms from ${moment(checkIn).format("YYYY-MM-DD")} to ${moment(
        checkOut
      ).format("YYYY-MM-DD")} for ${guests} guest(s).`
    );
  };

  return (
    <div>
      <RoomsNavbar />

      {/* Hero */}
      <section className="booking-hero">
        <div className="hero-overlay">
          <h1>Book Your Stay at Ivana Homestay</h1>
          <p>Comfortable rooms, unforgettable experience</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-form">
        <h2>Plan Your Stay</h2>
        <form onSubmit={handleSearch} className="form-inline">
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            placeholderText="Check-In"
            filterDate={(date) => !isDayBooked(date)}
          />

          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            placeholderText="Check-Out"
            filterDate={(date) => !isDayBooked(date)}
          />

          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
          </select>

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

      <RoomsFooter />
    </div>
  );
};

export default RoomsBooking;
