import React, { Component } from 'react';
import '../styles/styles.css';
import { SketchPicker } from 'react-color';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

const gbHeaderColor = localStorage.getItem("headerColor");
export class PageHeader extends Component {
  state = {
    popupVisible: false,
    show: false, background: '#296091'
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleClick = () => {
    if (!this.state.popupVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  };

  render() {
    const BASE_URL = '#'
    const { open } = this.state;
    const styleBack = {
      backgroundColor: this.state.background,
      height: '60px'
    }
    const styleBack1 = {
      backgroundColor: this.state.background
    }
    console.log('headerColor----', this.state.background);
    localStorage.setItem("headerColor", this.state.background);
    // gbHeaderColor = this.state.background;
    return (
      <div>
        <div className="row Header" style={styleBack1}>
          <div className="col-md-2">
            <div className="logo" style={styleBack}> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2">
            <ReactFlagsSelect
              countries={["US", "GB", "FR", "DE", "IT"]}
              customLabels={{ "US": "EN-US", "GB": "EN-GB", "FR": "FR", "DE": "DE", "IT": "IT" }}
              placeholder="Select Language" />
          </div>
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
          {/* <PageFooter footerColor={this.state.background}/> */}
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

export class PageFooter extends Component {

  render() {

    console.log('footer', this.props.footerColor)
    const footerBackgroundColor = {
      backgroundColor: this.props.footerColor
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-12 Footer" style={footerBackgroundColor}>Copyright © 2019 YooFoo All Rights Reserved</div>
        </div>
      </div>
    )
  }
}