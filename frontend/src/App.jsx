import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link,
  Redirect
} from "react-router-dom";
import LoginScreen from './pages/LoginScreen/LoginScreen'
import RegisterScreen from './pages/RegisterScreen/RegisterScreen';
import PasswordResetScreen from './pages/PasswordResetScreen/PasswordResetScreen';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/loginScreen"/>)} />
          <Route path="/loginScreen">
            <LoginScreen />
          </Route>
          <Route path="/registerScreen">
            <RegisterScreen />
          </Route>
          <Route path="/passwordReset">
            <PasswordResetScreen />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
