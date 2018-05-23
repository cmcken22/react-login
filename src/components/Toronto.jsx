import React from 'react';
import cx from 'classnames';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="main__backdrop main__backdrop--toronto">
        <div className="toronto__clouds">
          <div className="toronto__cloud toronto__cloud--1"></div><br/>
          <div className="toronto__cloud toronto__cloud--2"></div><br/>
          <div className="toronto__cloud toronto__cloud--3"></div>
        </div>
      </div>
    );
  }
}


export default App;