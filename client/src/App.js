import { Home, Landing, Form, Detail } from "./views";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname!=="/" && <NavBar />}
      <Route exact path="/" render= {() => <Landing /> } />
      <Route exact path="/home" render={() => <Home /> } />
      <Route exact path="/form" render={() => <Form /> } />
      <Route exact path="/detail" render={() => <Detail /> } />
    </div>
  );
}

export default App;