import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetchData";
import "./Navbar.css";

export const Navbar = () => {
  const [data, isLoading, error] = useFetch(
    "https://booking-artist.onrender.com/bookings",
  );
  return (
    <nav className="navlinks container">
      <ul>
        {/* Logo link */}
        <Link className="Link" to="/">
          <li className="logo">RÉSERVE</li>
        </Link>
        {/* Bookings link */}
        <Link className="Link" to="/bookings">
          <div className="booking-container">
            <li className="bookings">Bookings</li>
            <div className="notify">{data?.length} </div>
          </div>
        </Link>
      </ul>
    </nav>
  );
};
