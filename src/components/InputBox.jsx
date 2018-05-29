import React from 'react';
import cx from 'classnames';
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
      <polygon points={direction} className="inputbox__poly" />
    );
  }

  handleClick = () => {
    this.setState({dropdownActive: !this.state.dropdownActive});
  }

  componentDidMount() {
    this.caclDropdownPos();
    window.addEventListener("resize", (e) => this.caclDropdownPos());
  }

  caclDropdownPos = () => {
    let {x, y, width} = this.containerRef.getBoundingClientRect() ? this.containerRef.getBoundingClientRect() : 0;
    this.setState({
      dropdownPos: {top: 0, left: width + 5}
    });
  }

  handleSelect = (item) => {
    this.input.value = item.title;
    if(item.closeOnSelect) {
      this.setState({dropdownActive: false});
    }
    if(this.props.handleSelect) this.props.handleSelect(this.props.id, item.title);
    if(this.props.onBlur) this.props.onBlur();
    this.input.focus();
  }

  onFocus = () => {
    if(this.props.onFocus) this.props.onFocus();
  }

  preOnChange = (e) => {
    if(this.props.onChange) this.props.onChange(e);
  }

  render() {
    let {id, placeholder} = this.props;

    return (
      <div 
        ref={r => this.containerRef = r}
        className={cx("inputbox__container", {
          [this.props.classname]: this.props.classname
        })} 
      >
        <div className="inputbox__inner">
          <input 
            id={id || placeholder}
            placeholder={placeholder}
            className="inputbox__input"
            ref={r => this.input = r}
            onFocus={this.onFocus}
            onBlur={this.props.onBlur}
            onChange={this.preOnChange}
            value={this.props.value}
          />
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