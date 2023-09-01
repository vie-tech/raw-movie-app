import React, { useState, useEffect } from "react";
import MovieCards from "./Moviecards";
import Header from "./Header";
import "./App.css";
import FavouriteList from "./FavouriteList";
import SavedData from "./savedData";

function App() {
  const [display, setDisplay] = useState([]);
  const [movieName, setMovieName] = useState("");
  // Initialize favouriteMovie with data from localStorage or an empty array
  const [favouriteMovie, setFavouriteMovie] = useState(
    JSON.parse(localStorage.getItem("favs")) || []
  );
  const [savedData, setSavedData] = useState(
    JSON.parse(localStorage.getItem("savedData")) || []
  );

  const savedDataArray = savedData.map((item) => {
    return <SavedData img={item.Poster} />;
  });

  useEffect(()=>{

   
  }, [favouriteMovie])

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favouriteMovie));
    localStorage.setItem("savedData", JSON.stringify(savedData));
  }, [favouriteMovie, savedData]);

  const movieArray = display.map((item) => (
    <MovieCards
      key={item.imdbID}
      img={item.Poster}
      handleClick={addFavourites}
      movie={item}
    />
  ));

  const favouriteListArray = favouriteMovie.map((item) => (
    <FavouriteList
      key={item.imdbID}
      img={item.Poster}
      handleClick2={() => handleRemove(item)}
      movie={item}
    />
  ));

  function addFavourites(movie) {
    const isDuplicate = favouriteMovie.some(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );

    if (!isDuplicate) {
      const newFavouriteList = [...favouriteMovie, movie];
      setFavouriteMovie(newFavouriteList);
      setSavedData(favouriteMovie)
    } else {
      return;
    }
  }

  function handleRemove(movieToRemove) {
    const newFavouriteList = favouriteMovie.filter(
      (movie) => movie.imdbID !== movieToRemove.imdbID
    );
    setFavouriteMovie(newFavouriteList);
  }

  const getMovieRequest = (name) => {
    fetch(`http://www.omdbapi.com/?s=${name}&apikey=13a61972`)
      .then((res) => res.json())
      .then((data) => setDisplay(data.Search || []));
  };

  useEffect(() => {
    getMovieRequest(movieName);
  }, [movieName]);

  return (
    <>
      <div>
        <Header header="Movies" />
      </div>

      <input
        type="text"
        placeholder="Search for movie"
        onChange={(event) => {
          setMovieName(event.target.value);
        }}
        value={movieName}
      />

      {display.length > 0 ? (
        <div className="container">{movieArray}</div>
      ) : (
        <p>No movies to show...</p>
      )}

      <br />
      <br />
      <h1>My favourites</h1>
      <div className="fav-container">
        <br /> {favouriteListArray}
      </div>

      <div className="saved-container">{savedDataArray}</div>
    </>
  );
}

export default App;
