import './App.css';
import { Navbar } from './components/Navbar';
import { MovieSummary } from './components/MovieSummary.js';
import { tempMovieData } from "./TempMovieData.js";
import { useState } from 'react';
import { Search } from "./components/Search"
import { SearchResults } from "./components/SearchResults"
import { Main } from './components/Main.js';
import { ListBox } from './components/ListBox.js';
import { ImdbMoviesList } from './components/ImdbMoviesList.js';
import { WatchedMoviesList } from './components/WatchedMoviesList.js';
import { tempWatchedData } from './TempWatchedData.js'

function App() {
  const [imdbMovies, setImdbMovies] = useState([...tempMovieData]);

  const [watched, setWatched] = useState([...tempWatchedData]);

  return (
    <div className="App">
      <Navbar>
        <Search />
        <SearchResults imdbMovies={imdbMovies} />
      </Navbar>
      <Main>
        <ListBox>
          <ImdbMoviesList imdbMovies={imdbMovies} />
        </ListBox>
        <ListBox>
          <div>
            <MovieSummary watched={watched} />
            <WatchedMoviesList tempWatchedData={watched} />
          </div>
        </ListBox>
      </Main>
    </div>
  );
}

export default App;
