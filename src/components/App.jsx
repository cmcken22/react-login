import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toronto from './Toronto.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cloudPos: null,
      count: 10
    }
  }

  render() {
    return (
      <Router>
        <div className="main">
          
          <Toronto/>

          <div className="main__content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/Login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

const NotFound = () => (<h1>404</h1>)

export default App;