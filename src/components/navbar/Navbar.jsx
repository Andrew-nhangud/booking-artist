import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navlinks container">
      <ul>
        <Link className="Link" to="/">
          <li className="logo">RÉSERVE</li>
        </Link>
        <Link className="Link" to="/bookings">
          <div className="booking-container">
            <li className="bookings">Bookings</li>
            <div className="notify">2</div>
          </div>
        </Link>
      </ul>
    </nav>
  );
};
