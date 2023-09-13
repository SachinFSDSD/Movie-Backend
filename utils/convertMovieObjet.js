exports.movieResponse = (movies) => {
  let moviesResult = [];

  movies.forEach((movie) => {
    moviesResult.push({
      _id: movie._id,
      name: movie.name,
      description: movie.description,
      cast: movie.cast,
      posterUrl: movie.posterUrl,
      language: movie.language,
      relaseDate: movie.relaseDate,
      director: movie.director,
      releaseState: movie.releaseState,
    });
  });
  return moviesResult;
};
