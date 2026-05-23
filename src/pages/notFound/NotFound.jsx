import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <section className="notfound-container">
      <p className="notfound-message">Not Found 404</p>
      <Link className="Link" to={"/"}>
        <button className="home-link">
          Go <span>Home</span>
        </button>
      </Link>
    </section>
  );
};
