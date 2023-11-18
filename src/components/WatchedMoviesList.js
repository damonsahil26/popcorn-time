import { WatchedMovieItem } from "./WatchedMovieItem"

export const WatchedMoviesList = ({ tempWatchedData }) => {
    return (
        <ul className="list">
            {
                tempWatchedData.map(x => <WatchedMovieItem movie={x} key={x.imdbID} />)
            }
        </ul>
    );
}