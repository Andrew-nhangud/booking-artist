import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./FormController.css";

export const FormController = ({ artistId, artistName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // Status message state shown below the form after submit
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const statusTimerRef = useRef(null);

  // Show a temporary status message and automatically hide it after 4 seconds.
  const showStatus = (message, type) => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }
    setStatusMessage(message);
    setStatusType(type);
    statusTimerRef.current = setTimeout(() => {
      setStatusMessage("");
      setStatusType("");
      statusTimerRef.current = null;
    }, 4000);
  };

  // Clean up the timeout if the component unmounts before the message disappears.
  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  const onSubmit = async (formData) => {
    const newBooking = {
      artistId: artistId,
      artistName: artistName,
      ...formData,
    };
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        reset();
        showStatus(
          "Booking saved directly to your database server!",
          "success",
        );
      } else {
        showStatus("Server error: Failed to save booking.", "error");
      }
    } catch (error) {
      console.error("Network connection error:", error);
      showStatus(
        "Could not connect to the database server. Is npm run server running?",
        "error",
      );
    }
  };

  return (
    <section className="form">
      <p className="booking-name">
        Request a <span>booking</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="container-form">
        <div className="combine-fields">
          <div className="form-fields">
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              {...register("date", { required: "Required" })}
            />
            {errors.date && <p className="error">{errors.date.message}</p>}
          </div>
          <div className="form-fields">
            <label htmlFor="time">Start Time</label>
            <input
              type="time"
              id="time"
              {...register("time", { required: "Required" })}
            />
            {errors.time && <p className="error">{errors.time.message}</p>}
          </div>
        </div>

        <div className="combine-fields">
          <div className="form-fields">
            <label htmlFor="event">Event Type</label>
            <input
              type="text"
              id="event"
              placeholder="party"
              {...register("event", {
                required: "Required",
                minLength: { value: 2, message: "2 minmun characters" },
              })}
            />
            {errors.event && <p className="error">{errors.event.message}</p>}
          </div>

          <div className="form-fields">
            <label htmlFor="duration">Duration (Hours)</label>
            <input
              type="number"
              id="duration"
              step="1"
              {...register("duration", {
                required: "Required",
                min: { value: 1, message: "1hour minmun" },
                max: { value: 12, message: "12hours maxmum" },
              })}
            />
            {errors.duration && (
              <p className="error">{errors.duration.message}</p>
            )}
          </div>
        </div>

        <div className="form-fields">
          <label htmlFor="location">Vunue / Location</label>
          <input
            type="text"
            id="location"
            placeholder="downtown"
            {...register("location", {
              required: "Required",
              minLength: { value: 2, message: "2 minum character" },
            })}
          />
          {errors.location && (
            <p className="error">{errors.location.message}</p>
          )}
        </div>

        <div className="combine-fields">
          <div className="form-fields">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              placeholder="Andrew Smith"
              id="name"
              {...register("name", {
                required: "Required",
                minLength: { value: 2, message: "2 minmun characters" },
              })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-fields">
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="+27 66 039 8225"
              {...register("phoneNumber", {
                required: "Required",
                min: { value: 10, message: "10 minmum numbers " },
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "invalid phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        <div className="form-fields">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Andrew@example.com"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "invalid email",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-fields">
          <label htmlFor="message">Additional Message</label>
          <textarea
            id="message"
            placeholder="Enter your message here..."
            {...register("message")}
          ></textarea>
        </div>

        {/* Show an inline status message after submit, then hide it automatically */}
        {statusMessage && (
          <div
            className={`statusMessage ${statusType}`}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </div>
        )}

        <button type="submit" className="submit-btn">
          sub<span>mit</span>
        </button>
      </form>
    </section>
  );
};
