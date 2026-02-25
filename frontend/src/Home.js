import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/menu?search=${search}`);
    }
  };

  return (
    <div className="hero">
      <div className="hero-overlay">
        <h1>Delicious Food Delivered 🍔</h1>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <br /><br />

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Home;