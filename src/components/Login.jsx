import React from 'react';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleSubmit = () => {
    this.props.toggleLogin(false);
  }

  handleClickhere = () => {
    this.props.toggleLogin(false);
  }

  render() {
    return (
      <div className="login">
        <h1 className="login__text">Login</h1>
        <input className="login__input" placeholder="username" ref={r => this.userName = r}/><br/>
        <input className="login__input" type="password" placeholder="password" ref={r => this.password = r}/><br/>
        <button className="login__button">
          <div className="login__button--text" onClick={this.handleSubmit}>Enter</div>
        </button>
        <p className="login__bottom-text">If you are new to Gate Three, please <a className="login__bottom-text--hyperlink" onClick={this.handleClickhere}>click here</a> to sign up</p>
      </div>
    );
  }
}

export default Login;