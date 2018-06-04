import React from 'react';
import cx from 'classnames';

class Vancouver extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="main__backdrop vancouver">
        <div className="vancouver__backdrop">
        </div>
        <div className="vancouver__birds">

          {/* <div className="vancouver__bird-1">
            <div className="vancouver__bird-1__back-wing">
            </div>
            <div className="vancouver__bird-1__body">
            </div>
            <div className="vancouver__bird-1__front-wing">
            </div>
          </div> */}

          <div className="vancouver__bird-2">
            <div className="vancouver__bird-2__back-wing">
            </div>
            <div className="vancouver__bird-2__body">
            </div>
            <div className="vancouver__bird-2__front-wing">
            </div>
          </div>

        </div>
      </div>
    );
  }
}


export default Vancouver;