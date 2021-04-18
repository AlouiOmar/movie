import React, { Component } from "react";
import MovieForm from "./movieForm";
import { getMovie } from "../services/fakeMovieService";

class MovieDetails extends Component {
  state = { data: getMovie(this.props.match.params.id) };
  handleRedirect = () => {
    console.log("redirect");
    this.props.history.push("/movies");
  };

  render() {
    console.log(this.state.movie);
    return (
      <React.Fragment>
        <h1>Movie Details {this.props.match.params.id}</h1>
        <MovieForm data={this.state.data}></MovieForm>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
