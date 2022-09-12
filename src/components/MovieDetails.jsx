import { Component } from "react";

import { Card, Alert, Spinner } from "react-bootstrap";

// ORDER OF CALLING
// render() happens
// receive the prop for the movieTitle
// fetch the corresponding movie
// set the state with the movieObj
// render() gets called again after this.setState()

//IMPORTANT! every time you use setState(), the render() method fires again!

class MovieDetails extends Component {
  // MoiveDetails is receiving the value of the dropdown (in the App component) through props
  // We then proceed to fetch the movie with the prop title

  state = {
    movieDetailsObject: null, // this will become an object after the fetch is completed
  };

  componentDidMount() {
    // this happens after the initial render, and after we receive the data a setState will be called from fetchMovieDetails
    this.fetchMovieDetails(); // this happens only one time for every component mount

    // the render() method gets called again after the fetchMovieDetails function call
  }

  // this is called in the componentDidMount, so at the end of the mounting phase of the component
  fetchMovieDetails = () => {
    fetch("http://www.omdbapi.com/?apikey=85a2b045&s=" + this.props.movieTitle)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(movies => {
        console.log(movies);

        this.setState({
          movieDetailsObject: movies.Search[0],
        });
      });
  };

  // This is used to trigger another fetch when we receive a new this.props.movieTitle
  componentDidUpdate(prevProps, prevState) {
    console.log("MovieDetails UPDATE OUTER", prevProps.movieTitle, this.props.movieTitle);
    if (prevProps.movieTitle !== this.props.movieTitle) {
      console.log("MovieDetails UPDATE INNER");
      this.fetchMovieDetails(); // this is invoked only when this.props.movieTitle changes
      // the if statement makes sure we invoke this fetchMovieDetails() function
      // only when the dropdown changes the tile in the App state
    }
  }

  render() {
    console.log("MovieDetails RENDER");
    // this.fetchMovieDetails(); // this will generate an infinite loop
    return (
      <>
        <h2>{this.props.movieTitle}</h2>

        {this.state.movieDetailsObject ? (
          <Card>
            <Card.Img variant="top" src={this.state.movieDetailsObject.Poster} />
            <Card.Body className="text-dark p-4">
              <Card.Title>{this.state.movieDetailsObject.Title}</Card.Title>
              <Card.Text>{this.state.movieDetailsObject.Year}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          //   <Alert variant={"info"}>Loading the movie...</Alert>
          <Spinner animation="grow" variant="info" />
        )}
      </>
    );
  }
}

export default MovieDetails;
