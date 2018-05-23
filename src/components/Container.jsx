import React from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import mainLogo from'../assets/gateThreeLogo-white.png';

class Container extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { className, children } = this.props;
    return (
      <div className={cx("container", {
        [className]: className
      })}>
        <div className="container__inner">
          <div className="container__image">
            <img className="container__logo" src={mainLogo}/>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default Container;