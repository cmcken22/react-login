import React from 'react';
import cx from 'classnames';
import Dropdown from './Dropdown';

class InputBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
      openDrawer: false,
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

  handleSelect = (item, removeItem) => {
    if(item.openDrawer) {
      this.setState({openDrawer: true});
      this.input.focus();
    } else {
      this.setState({openDrawer: false});
    }
    if(item.closeOnSelect || this.props.closeDropdownOnSelect) this.setState({dropdownActive: false});
    if(this.props.handleSelect) {
      if(this.props.clearDrawer) this.props.clearDrawer();
      this.props.handleSelect(this.props.id, item.title, removeItem);
    }
  }

  onFocus = () => {
    if(this.props.onFocus) this.props.onFocus();
  }

  preOnChange = (e) => {
    if(this.props.onChange) this.props.onChange(e);
  }

  openDrawer = (value) => {
    this.setState({openDrawer: value});
  }

  render() {
    let {id, placeholder} = this.props;

    return (
      <div className="inputbox__outer-container">
        <div 
          ref={r => this.containerRef = r}
          className={cx("inputbox__container", {
            [this.props.classname]: this.props.classname,
            "inputbox__container--bottom-pad": !this.state.openDrawer
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
                  selectMultiple={this.props.selectMultiple}
                />
              </div>
            : null}

          </div>
        </div>
        {this.state.openDrawer ? this.props.drawer : null}
      </div>
    );
  }
}

export default InputBox;