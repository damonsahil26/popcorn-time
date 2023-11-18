export const SearchResults = ({ imdbMovies }) => {
    return (
        <p className="num-results">
            Found <strong>{imdbMovies.length}</strong> results
        </p>
    );
}