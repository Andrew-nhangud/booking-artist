import { useForm } from "react-hook-form";

export const FormController = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="date">Event Date</label>
        <input
          type="date"
          id="date"
          {...register("date", { required: "Required" })}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>

      <div>
        <label htmlFor="time">Start Time</label>
        <input
          type="time"
          id="time"
          {...register("time", { required: "Required" })}
        />
        {errors.time && <p>{errors.time.message}</p>}
      </div>

      <div>
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
        {errors.event && <p>{errors.event.message}</p>}
      </div>

      <div>
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
        {errors.duration && <p>{errors.duration.message}</p>}
      </div>

      <div>
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
        {errors.location && <p>{errors.location.message}</p>}
      </div>

      <div>
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
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
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
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>
      <div>
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
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">submit</button>
    </form>
  );
};
