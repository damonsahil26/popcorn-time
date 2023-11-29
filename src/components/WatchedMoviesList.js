import { WatchedMovieItem } from "./WatchedMovieItem"

export const WatchedMoviesList = ({ tempWatchedData, onDeleteWatchedMovies }) => {
    return (
        <ul className="list">
            {
                tempWatchedData.map(x => <WatchedMovieItem movie={x} key={x.imdbID} onDeleteWatchedMovies={onDeleteWatchedMovies} />)
            }
        </ul>
    );
}