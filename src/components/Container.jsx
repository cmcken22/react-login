import React from 'react';
import cx from 'classnames';
import mainLogo from'../assets/gateThreeLogo-white.png';
import Toronto from './skylines/Toronto.jsx';
import Ottawa from './skylines/Ottawa.jsx';
import Edmonton from './skylines/Edmonton.jsx';
import Vancouver from './skylines/Vancouver.jsx';
import {connect} from "react-redux";
// import {bindActionCreators} from "redux/index";

class Container extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { className, children } = this.props;
    let currentCity = this.props.currentCity;

    return (
      <div className={`main theme-${currentCity}`}>

        {currentCity === 'toronto' ?
          <Toronto/>
        : currentCity === 'ottawa' ?
          <Ottawa/>
        : currentCity === 'edmonton' ?
          <Edmonton/>
        : currentCity === 'vancouver' ?
          <Vancouver/>
        : null}

        <div className="main__content">
          <div className="container">
            <div className={cx("container__inner", {
              [className]: className
            })}>
              <div className="container__image">
                <img className="container__logo" src={mainLogo}/>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      currentCity: state.location.get('currentCity')
    }
  },
  dispatch => {
    return {
    }
  }
)(Container);