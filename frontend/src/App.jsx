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
import AdvanceHomeScreen from './pages/AdvanceHomeScreen/AdvanceHomeScreen';
import EditWatchlist from './pages/EditWatchlist/EditWatchlist';
import ViewWatchlist from './pages/ViewWatchlist/ViewWatchlist';
import ViewAsset from './pages/ViewAsset/ViewAsset';
import AccountSelection from './pages/AccountSelection/AccountSelection';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/selectAccountType"/>)} />
          <Route path="/selectAccountType">
            <AccountSelection />
          </Route>
          <Route path="/loginScreen">
            <LoginScreen />
          </Route>
          <Route path="/registerScreen">
            <RegisterScreen />
          </Route>
          <Route path="/passwordReset">
            <PasswordResetScreen />
          </Route>
          <Route path="/advanceHome">
            <AdvanceHomeScreen />
          </Route>
          <Route path="/watchlist/edit/:watchlistID">
            <EditWatchlist />
          </Route>
          <Route path="/watchlist/:watchlistID/asset/:assetID">
            <ViewAsset />
          </Route>
          <Route path="/watchlist/:watchlistID">
            <ViewWatchlist />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
