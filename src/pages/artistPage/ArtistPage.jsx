import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetchData";
import "./ArtistPage.css";

export const ArtistPage = () => {
  const [data, isLoading, error] = useFetch("../../../data/dataBase.json");
  const { id } = useParams();

  const d = data?.Artist?.find((d) => d.id === parseInt(id));

  return (
    <section className="container artist-Pg">
      <Link className="Link" to="/">
        <button className="bck-btn">Back to Discovery</button>
      </Link>

      {isLoading && <p>loading</p>}
      <div key={d?.id}>
        <img className="artist-img" src={d?.image} alt={d?.name} />
        <div className="artist-details">
          <p className="artist-name">{d?.name}</p>
          <p className="artist-location">{d?.location}</p>
        </div>

        <div className="artist-skills">
          <p className="artist-genre">{d?.genre}</p>
          <Link className="Link" to={d?.socialLink}>
            <button className="artist-social">social link</button>
          </Link>
        </div>
      </div>
      {error}
    </section>
  );
};
