import { useEffect, useState } from 'react';
import { StarRatings } from './StarRatings.js'
import { Loader } from './Loader.js'

export const MovieDetails = ({ selectedId, onCloseDetails, onAddWatchedMovies }) => {
    const key = "ac05d821";
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [watchedStarRatings, setWatchedStarRatings] = useState('');

    useEffect(() => {

        const callback = (e) => {
            if (e.code === 'Escape') {
                onCloseDetails();
            }
        }
        document.addEventListener('keydown', callback);

        return (
            () => {
                document.removeEventListener('keydown', callback);
            }
        )
    }, [onCloseDetails]);
    useEffect(() => {
        if (!selectedMovie)
            return;

        document.title = `Movie | ${selectedMovie.Title}`;

        return () => {
            document.title = 'PopCorn-Time'
        }
    }, [selectedMovie])

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading((isLoading) => !isLoading);
            const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);
            const data = await movieDetailsResponse.json();
            setSelectedMovie(data);
            setIsLoading((isLoading) => !isLoading);
        }
        fetchMovieDetails();
    }, [selectedId])

    return (
        <>
            {selectedMovie && isLoading && <Loader />}
            {selectedMovie && !isLoading && <div className="details">
                <header>
                    <button className="btn-back" onClick={onCloseDetails}>&larr;</button>
                    <img src={selectedMovie.Poster} alt={selectedMovie.Title}></img>
                    <div className='details-overview'>
                        <h2>{selectedMovie.Title}</h2>
                        <p>{selectedMovie.Released} &bull; {selectedMovie.Runtime}</p>
                        <p>{selectedMovie.Genre}</p>
                        <p><span>⭐</span>
                            {selectedMovie.imdbRating} IMDb Ratings
                        </p>
                    </div>
                </header>
                <section>
                    <div className='rating'>
                        <StarRatings maxRatings={10} size={24} defaultRating={selectedMovie.imdbRating} onSetRatings={setWatchedStarRatings} />
                        <button className='btn-add' onClick={() => {
                            onAddWatchedMovies({ ...selectedMovie, UserRatings: watchedStarRatings })
                            onCloseDetails();
                        }}>+ Add to list</button>
                    </div>
                    <em>{selectedMovie.Plot}</em>
                    <p>Starrings: {selectedMovie.Actors}</p>
                    <p>Directed by: {selectedMovie.Director}</p>
                </section>
            </div>
            }
        </>
    );

}