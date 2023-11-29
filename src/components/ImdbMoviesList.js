import { ImdbMovieItem } from './ImdbMovieItem.js';

export const ImdbMoviesList = ({ imdbMovies, onSelectedId }) => {
    return (
        <ul className="list list-movies">
            {
                imdbMovies.map(x =>
                    <ImdbMovieItem movie={x} key={x.imdbID} onSelectedId={onSelectedId} />
                )
            }
        </ul>
    );
}