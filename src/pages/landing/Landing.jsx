import { useFetch } from "../../hooks/useFetchData";

import "./Landing.css";

import { Link } from "react-router-dom";

export const Landing = () => {
  const [data, isLoading, error] = useFetch("../../../data/dataBase.json");

  return (
    <section className="landing-page container">
      <h1 className="heading">Find the perfect sound for your next event.</h1>
      <p className="description">
        We connect you with the perfect artists for weddings, corporate events
        and private parties.
      </p>

      <div className="card-container">
        {data?.Artist?.map((d) => (
          <div className="card" key={d.id}>
            {/* making the image to be clickable */}
            <Link to={`/artistPage/${d.id}`}>
              <img src={d.image} alt={d.name} />
            </Link>

            <h3>{d.name}</h3>
            <div className="card-info">
              <p>{d.genre}</p>
              <p>{d.location}</p>
            </div>
          </div>
        ))}
        {isLoading && <p> loading..</p>}
      </div>
    </section>
  );
};
