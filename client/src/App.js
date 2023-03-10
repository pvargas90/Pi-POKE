import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render = {() => <Landing />} />

      <Route exact path="/home" render = {() => <Home />} />

    </div>
  );
}

export default App;