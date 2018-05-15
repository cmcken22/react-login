import React from 'react';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      options: [
        'rethink',
        'build',
        'connect'
      ],
      currentOption: 0
    }
  }

  componentDidMount() {
    setTimeout(this.getOption, 3000);
  }

  getOption = () => {
    this.setState({currentOption: this.state.currentOption + 1});
  }

  render() {
    return (
      <div className="main__container">
        
        <div className="navbar__container">
          <div className="navbar__icon">

          </div>
          <div className="navbar__options-container">
            <div className="navbar__option">
              Blog
            </div>
            <div className="navbar__option">
              Contact
            </div>
          </div>
        </div>

        <h1>We {this.state.options[this.state.currentOption]}</h1>
      </div>
    );
  }
}

export default App;