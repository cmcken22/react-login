import React from 'react';
import cx from 'classnames';
import plane from './../../assets/plane.png';

class Edmonton extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="main__backdrop edmonton">
        <div className="edmonton__backdrop">
        </div>
        <div className="edmonton__planes">
          <div className="edmonton__plane"></div>
        </div>
      </div>
    );
  }
}


export default Edmonton;