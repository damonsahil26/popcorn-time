export const WatchedMovieItem = ({ movie, onDeleteWatchedMovies }) => {
    console.log(movie);
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.UserRatings}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.Runtime}</span>
                </p>

                <p>
                    <button className="btn-delete" onClick={() => onDeleteWatchedMovies(movie)}>X</button>
                </p>
            </div>
        </li>
    );
}