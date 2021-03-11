import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/loginScreen"/>)} />
          <Route path="/loginScreen">
            <LoginScreen />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
