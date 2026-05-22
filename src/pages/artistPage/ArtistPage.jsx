import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetchData";
import { FormController } from "../../components/form/FormController";
import "./ArtistPage.css";

export const ArtistPage = () => {
  const { id } = useParams();
  const [data, isLoading, error] = useFetch(
    `http://localhost:5000/Artist/${id}`,
  );

  return (
    <section className="container artist-Pg">
      <Link className="Link" to="/">
        <button className="bck-btn">Back to Discovery</button>
      </Link>

      {isLoading && <p>Loading artist...</p>}
      <div className="artist-info">
        <div key={data?.id}>
          <img className="artist-img" src={data?.image} alt={data?.name} />
          <div className="artist-details">
            <p className="artist-name">{data?.name}</p>
            <p className="artist-location">{data?.location}</p>
          </div>
          <div className="artist-skills">
            <p className="artist-genre">{data?.genre}</p>
            <Link className="Link" href={data?.socialLink} target="_blank">
              <button className="artist-social">
                social <span>link</span>
              </button>
            </Link>
          </div>
          {!data && <p>Artist not found.</p>}
        </div>

        {/* calling the form component */}
        <FormController artistId={id} artistName={data?.name} />
      </div>
    </section>
  );
};
