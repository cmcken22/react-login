import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <div className="main__container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (<h1>404</h1>)

export default App;