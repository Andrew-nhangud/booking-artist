import { useState } from "react";
import { useFetch } from "../../hooks/useFetchData";
import "./bookings.css";

export const Bookings = () => {
  const [data, isLoading, error] = useFetch(
    "https://booking-artist.onrender.com/bookings",
  );

  //
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
        // Optional: Refresh your page or state here to update the UI
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
      {data?.length === 0
        ? "the are no bookings as of yet"
        : data?.map((d) => (
            <div key={d.id} className="booking-card">
              <p className="artistName">
                {d?.artistName} <span>pending </span>
              </p>
              <div className="row-placer">
                {/*  */}
                <div className="row-fields">
                  <p className="booking-detail">
                    <span className="booking-lables">Date: </span> {d?.date}
                  </p>
                  <p className="booking-detail">
                    <span className="booking-lables">Time: </span>
                    {d?.time} ({d?.duration} hrs)
                  </p>
                </div>

                {/*  */}
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
                  <button className="cancel-btn">cancelled</button>
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
