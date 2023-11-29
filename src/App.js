import './App.css';
import { Navbar } from './components/Navbar';
import { MovieSummary } from './components/MovieSummary.js';
import { useEffect, useState } from 'react';
import { Search } from "./components/Search"
import { SearchResults } from "./components/SearchResults"
import { Main } from './components/Main.js';
import { ListBox } from './components/ListBox.js';
import { ImdbMoviesList } from './components/ImdbMoviesList.js';
import { WatchedMoviesList } from './components/WatchedMoviesList.js';
import { Loader } from './components/Loader.js';
import { ErrorMessage } from './components/ErrorMessage.js';
import { MovieDetails } from './components/MovieDetails.js';

const key = "ac05d821";

function App() {
  const [imdbMovies, setImdbMovies] = useState([]);

  const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const [selectedId, setSelectedId] = useState('');

  const onSelectedId = (id) => {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  const onCloseDetails = () => {
    setSelectedId('');
  }

  const handleAddWatchedMovies = (movie) => {
    for (var i = 0; i < watched.length; i++) {
      if (watched[i].imdbID === movie.imdbID)
        return;
    }
    setWatched((watched) => [...watched, movie]);
  }

  const handleDeleteWatchedMovies = (movie) => {
    setWatched(watched.filter(x => x.imdbID !== movie.imdbID));
  }

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const controller = new AbortController();
        setIsLoading((isLoading) => !isLoading);
        setErrorMessage('');
        const apiResponse = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, { signal: controller.signal });

        if (!apiResponse.ok) {
          throw new Error('Unable to fetch data due to some error.');
        }
        var data = await apiResponse.json();

        if (data.Response === 'False') {
          throw new Error('No Movies Found');
        }
        setImdbMovies(data.Search);

        return function () {
          controller.abort();
        }
      }
      catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
      }
      finally {
        setIsLoading((isLoading) => !isLoading);
      }
    }

    if (query.length < 3) {
      setImdbMovies([]);
      setErrorMessage("");
      return;
    }
    onCloseDetails();
    fetchMovies();
  }, [query]);

  return (
    <div className="App">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults imdbMovies={imdbMovies} />
      </Navbar>
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && <ImdbMoviesList imdbMovies={imdbMovies} onSelectedId={onSelectedId} />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </ListBox>
        <ListBox>{
          selectedId ? <MovieDetails selectedId={selectedId}
            onCloseDetails={onCloseDetails}
            onAddWatchedMovies={handleAddWatchedMovies}
          />
            :
            <>
              <MovieSummary watched={watched} />
              <WatchedMoviesList tempWatchedData={watched} onDeleteWatchedMovies={handleDeleteWatchedMovies} />
            </>
        }
        </ListBox>
      </Main>
    </div>
  );
}

export default App;
