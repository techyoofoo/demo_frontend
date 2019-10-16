import React, { Component } from 'react';
import '../styles/styles.css';
import { SketchPicker } from 'react-color';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageHeader extends Component {
  state = {
    popupVisible: false,
    show: false, background: '#296091'
  };
  handleClick = () => {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));
  };

  handleOutsideClick = e => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  };
  render() {
    const BASE_URL = '#'
    const styleBack = {
      backgroundColor: this.state.background,
      height: '60px'
    }
    const styleBack1 = {
      backgroundColor: this.state.background
    }
    console.log('headerColor', this.state.background)
    return (
      <div>
        <div className="row Header" style={styleBack1}>
          <div className="col-md-2">
            <div className="logo" style={styleBack}> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/yoofoologo1.png" alt="logo"></img></a></div>
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-1">
            <div className="popover-container"
              ref={node => {
                this.node = node;
              }}
            >
              <button className="btn btn-outline-light" onClick={this.handleClick}>Change Color Theme</button>
              {this.state.popupVisible && (
                <div className="popover">
                  <SketchPicker color={this.state.background} onChangeComplete={this.handleChangeComplete} />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-1 logouticon">
            <a href={BASE_URL}>
              <span className="glyphicon glyphicon-log-out"></span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}