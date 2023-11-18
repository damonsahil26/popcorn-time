import { ImdbMovieItem } from './ImdbMovieItem.js';

export const ImdbMoviesList = ({ imdbMovies }) => {
    return (
        <ul className="list">
            {
                imdbMovies.map(x =>
                    <ImdbMovieItem movie={x} key={x.imdbID} />
                )
            }
        </ul>
    );
}