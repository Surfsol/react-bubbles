import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './components/Login';
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/bubblepage">Bubble Page</Link>
          </li>
          
        </ul>
        {/* switch, can use without exact */}
        <Switch>
          <PrivateRoute path="/bubblepage" component={BubblePage} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;