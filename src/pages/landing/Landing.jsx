import { useState } from "react";
import { useFetch } from "../../hooks/useFetchData";
import { useDebounce } from "../../hooks/useDebounce"; // Importing our new hook
import { SearchBar } from "../../components/searchBar/searchBar";
import { Link } from "react-router-dom";
import "./Landing.css";

export const Landing = () => {
  const [data, isLoading, error] = useFetch(
    "https://booking-artist.onrender.com/Artist",
  );

  // State to track what the user is typing instantly
  const [searchTerm, setSearchTerm] = useState("");

  // Get the debounced version of the search term (waits 300ms)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter the artists array based on name, genre, or location
  const filteredArtists = data?.filter((artist) => {
    // If the debounced search is empty, show all artists
    if (!debouncedSearchTerm) return true;

    // Convert everything to lowercase for case-insensitive matching
    const searchString = debouncedSearchTerm.toLowerCase();
    const artistName = artist.name.toLowerCase();
    const artistGenre = artist.genre.toLowerCase();
    const artistLocation = artist.location.toLowerCase();

    // Check if the search string exists in any of the three fields
    return (
      artistName.includes(searchString) ||
      artistGenre.includes(searchString) ||
      artistLocation.includes(searchString)
    );
  });

  return (
    <section className="landing-page container">
      <h1 className="heading">Find the perfect sound for your next event.</h1>
      <p className="description">
        We connect you with the perfect artists for weddings, corporate events
        and private parties.
      </p>

      {/* Pass the state and the setter function down as props */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="card-container">
        {/* We map over filteredArtists instead of the raw data */}
        {filteredArtists?.map((d) => (
          <div className="card" key={d.id}>
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

        {/* Show a friendly message if the filter returns zero matches */}
        {!isLoading && filteredArtists?.length === 0 && (
          <p className="no-results">No artists found matching your search.</p>
        )}

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
