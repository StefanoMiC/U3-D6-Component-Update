import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieDetails from "./components/MovieDetails";
import MovieDropdown from "./components/MovieDropdown";

class App extends Component {
  state = {
    movieTitle: "Batman Begins",
  };

  //this.setState()
  handleMovieTitle = newMovie => {
    this.setState({
      movieTitle: newMovie,
    });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row /*  className="justify-content-center" */>
            <Col md={6} className="offset-md-3">
              <MovieDropdown
                movieTitle={this.state.movieTitle}
                handleMovieTitle={this.handleMovieTitle}
              />
            </Col>

            <Col md={6} className="offset-md-3">
              <MovieDetails movieTitle={this.state.movieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
