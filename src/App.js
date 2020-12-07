import "./App.css";
import JobSection from "./jobssection/JobsSection";
import { Header } from "./header/Header";
import SearchBar from "./searchbar/SearchBar";
import Position from "./position/Position";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/position/:id" children={<Position />}></Route>
      </Router>

      <Header></Header>
      <SearchBar></SearchBar>
      <JobSection></JobSection>
    </div>
  );
}

export default App;
