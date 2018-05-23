import React from 'react';
import openEye from'../assets/openEye.png';
import closedEye from'../assets/closedEye.png';

class PasswordInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  renderEye = (open) => {
    let eye = open ? openEye : closedEye;
    return(
      <img className="passwordInput__eye" src={eye} onClick={this.handleClick}/>
    );
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    const placeholder = this.props.placeholder || "password";

    return (
      <div className="passwordInput__container" ref={r => this.containerRef = r}>
        <div className="passwordInput__inner">
          
          <input className="passwordInput__input" type={this.state.open ? "password" : "text"} id={placeholder} placeholder={placeholder} ref={r => this.input = r}/>
          {this.renderEye(this.state.open)}
        </div>
      </div>
    );
  }
}

export default PasswordInput;