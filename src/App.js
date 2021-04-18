//import logo from "./logo.svg";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Model from "./components/3dmodel";
import Customers from "./components/customers";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import MovieDetails from "./components/movieDetails";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Rentals from "./components/rentals";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/model" component={Model}></Route>

          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/movies/new" component={MovieForm}></Route>
          <Route path="/movies/:id" component={MovieDetails}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" exact component={Home}></Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
        {/*  <Movies></Movies> */}
      </main>
    </div>
  );
}

export default App;
