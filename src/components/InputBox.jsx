import React from 'react';
import Dropdown from './Dropdown.jsx';

class InputBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
      dropdownPos: {
        top: 0,
        left: 0
      }
    }
  }

  renderPoly = (forward) => {
    let direction = forward ? "0,0 0,20 20,10" : "20,0 20,20 0,10";
    return(
      <polygon points={direction} style={{fill:"#662D91",stroke:"#662D91",strokeWidth:"1"}} />
    );
  }

  handleClick = () => {
    this.setState({dropdownActive: !this.state.dropdownActive});
  }

  componentDidMount() {
    let {x, y, width} = this.containerRef.getBoundingClientRect();
    this.setState({
      dropdownPos: {top: y, left: x + width + 5}
    });
  }

  handleSelect = (item) => {
    this.input.value = item;
  }

  render() {
    let {placeholder} = this.props;

    return (
      <div className="inputbox__container" ref={r => this.containerRef = r}>
        <div className="inputbox__inner">
          
          <input className="inputbox__input" id={placeholder} placeholder={placeholder} ref={r => this.input = r}/>
          <svg className="inputbox__svg" height="20" width="22" onClick={this.handleClick}>
            {this.renderPoly(!this.state.dropdownActive)}
          </svg>

          {this.state.dropdownActive ?
            <div className="inputbox__dropdown" style={this.state.dropdownPos}>
              <Dropdown
                title={this.props.dropdownTitle}
                listItems={this.props.listItems}
                onSelect={this.handleSelect}
              />
            </div>
          : null}

        </div>
      </div>
    );
  }
}

export default InputBox;