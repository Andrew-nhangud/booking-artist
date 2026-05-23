import { useFetch } from "../../hooks/useFetchData";

import "./Landing.css";

import { Link } from "react-router-dom";

export const Landing = () => {
  const [data, isLoading, error] = useFetch("http://localhost:5000/Artist");

  return (
    <section className="landing-page container">
      <h1 className="heading">Find the perfect sound for your next event.</h1>
      <p className="description">
        We connect you with the perfect artists for weddings, corporate events
        and private parties.
      </p>

      <div className="card-container">
        {data?.map((d) => (
          <div className="card" key={d.id}>
            {/* making the image to be clickable */}
            <Link to={`/artistPage/${d.id}`}>
              <img src={d.image} alt={d.name} />
            </Link>
            <h3>{d.name}</h3>
            {/* container for the artist's info */}
            <div className="card-info">
              <p>{d.genre}</p>
              <p>{d.location}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="loading-state">
            <span className="spinner"></span>
            <p>Loading artists…</p>
          </div>
        )}
        {error && (
          <p className="error">
            please try <span>again later </span>
          </p>
        )}
      </div>
    </section>
  );
};
