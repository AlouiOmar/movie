import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (id) => {
    console.log(id);
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };
  handleNewMovie = () => {
    this.props.history.push("/movies/new");
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
        <button
          type="button"
          onClick={this.handleNewMovie}
          className="btn btn-primary"
        >
          New Movie
        </button>

        <p>Showing {count} movies in the database. </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>
                  <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                </td>
                <td>{movie.genre}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.handleDelete(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
