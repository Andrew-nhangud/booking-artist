import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetchData";
import "./bookings.css";

export const Bookings = () => {
  const [data, isLoading, error] = useFetch(
    "https://booking-artist.onrender.com/bookings",
  );

  // Local state to manage UI updates dynamically
  const [bookingsList, setBookingsList] = useState([]);

  // Sync custom hook data to local state when it arrives
  useEffect(() => {
    if (data) {
      const initialBookings = data.map((item) => ({
        ...item,
        status: item.status || "pending", // fallback to pending if status isn't in DB
      }));
      setBookingsList(initialBookings);
    }
  }, [data]);

  // Handle Cancel Button Click
  const handleCancel = (id) => {
    setBookingsList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, status: "cancelled" } : item,
      ),
    );
  };

  const handleDelection = async (id) => {
    try {
      // 1. Send a DELETE request to your API with the specific booking ID
      const response = await fetch(
        `https://booking-artist.onrender.com/bookings/${id}`,
        {
          method: "DELETE",
        },
      );

      // 2. Check if the server successfully deleted the item
      if (response.ok) {
        alert("Booking deleted successfully!");
        // Update local state to instantly remove item from UI
        setBookingsList((prevList) =>
          prevList.filter((item) => item.id !== id),
        );
      } else {
        alert("Failed to delete booking.");
      }
    } catch (error) {
      // 3. Handle network errors or server crashes
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <section className="booking container">
      {bookingsList.length === 0
        ? "the are no bookings as of yet"
        : bookingsList.map((d) => (
            <div key={d.id} className="booking-card">
              <p className="artistName">
                {d?.artistName} {/* 1. Dynamic status text based on state */}
                <span>{d.status} </span>
              </p>
              <div className="row-placer">
                <div className="row-fields">
                  <p className="booking-detail">
                    <span className="booking-lables">Date: </span> {d?.date}
                  </p>
                  <p className="booking-detail">
                    <span className="booking-lables">Time: </span>
                    {d?.time} ({d?.duration} hrs)
                  </p>
                </div>

                <div className="row-fields">
                  <p className="booking-detail">
                    <span className="booking-lables">Location: </span>
                    {d?.location}
                  </p>
                  <p className="booking-detail">
                    <span className="booking-lables">Booker: </span>
                    {d?.name} <span>.</span> {d?.event}
                  </p>
                </div>

                <div className="booking-btns">
                  {/* 2. Button disappears if status is cancelled */}
                  {d.status !== "cancelled" && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(d.id)}
                    >
                      cancel
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelection(d.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
    </section>
  );
};
