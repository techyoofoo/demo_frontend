import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageFooter } from './header';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["oldpassword"] = "";
      fields["NewPassword"] = "";
      fields["ConfirmPassword"] = "";
      this.setState({ fields: fields });
      alert("Form submitted");
    }
  }
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;


    if (!fields["oldpassword"]) {
      formIsValid = false;
      errors["oldpassword"] = "*Please enter your old password.";
    }

    if (typeof fields["oldpassword"] !== "undefined") {
      if (!fields["oldpassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["oldpassword"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields["NewPassword"]) {
      formIsValid = false;
      errors["NewPassword"] = "*Please enter your new password.";
    }

    if (typeof fields["NewPassword"] !== "undefined") {
      if (!fields["NewPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["NewPassword"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields["ConfirmPassword"]) {
      formIsValid = false;
      errors["ConfirmPassword"] = "*Please enter your confirm password.";
    }

    if (typeof fields["ConfirmPassword"] !== "undefined") {
      if (!fields["ConfirmPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["ConfirmPassword"] = "*Please enter secure and strong password.";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }


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
    console.log('Background', this.state.background)
    return (
      <div>
        <div className="container-fluid">
          <div className="row fixed-header" style={styleBack1}>
            <div className="col col-sm-6 col-md-2">
              <div className="logo" style={styleBack}> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
            </div>
            <div className="col col-sm-6 col-md-10 textalign changepassword">
              <div className="innerlinks">
                <ul>
                  <li>
                    <button className="btn btn-outline-light" onClick={this.submituserRegistrationForm}>
                      <Link to="/changepassword" className="btn btn-link"> Change Password  </Link></button>
                  </li>
                  <li>
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
                  </li>
                  <li>
                    <a href={BASE_URL}>
                      <span className="glyphicon glyphicon-log-out logouticon"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="row Loginvbg container-login100">
                <div className="col-sm-2"></div>
                <div className="col-sm-4">

                  <div className="wrap-login100 p-l-55 p-r-55 p-t-25 p-b-25">
                    <form className="login100-form validate-form">
                      <span className="login100-form-title p-b-49">
                        Change Password
			        		</span>
                      <div className="wrap-input100 validate-input">
                        <span className="label-input100">Old Password</span>
                        <input className="input100" type="text" name="oldpassword" placeholder="Type your Old Password" value={this.state.fields.oldpassword} />
                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                      </div>
                      <div className="errorMsg">{this.state.errors.oldpassword}</div>

                      <div className="wrap-input100 validate-input m-t-20">
                        <span className="label-input100">New Password</span>
                        <input className="input100" type="text" name="NewPassword" placeholder="Type your New Password" value={this.state.fields.NewPassword} />
                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                      </div>
                      <div className="errorMsg">{this.state.errors.NewPassword}</div>

                      <div className="wrap-input100 validate-input m-t-20">
                        <span className="label-input100">Confirm Password</span>
                        <input className="input100" type="text" name="ConfirmPassword" placeholder="Type your Confirm Password" value={this.state.fields.ConfirmPassword} />
                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                      </div>
                      <div className="errorMsg">{this.state.errors.ConfirmPassword}</div>

                      <div class="m-t-20 checkbox checkp">
                        <input type="checkbox" class="form-check-input" />
                        <label for="customCheck">Show my password</label>
                      </div>

                      <div className="container-login100-form-btn m-t-20">
                        <div className="wrap-login100-form-btn">
                          <div className="login100-form-bgbtn"></div>
                          <button className="login100-form-btn" onClick={this.submituserRegistrationForm}>
                            Submit
						        	</button>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
                <div className="col-sm-2"></div>
              </div>

            </div>
          </div>
          <div className="fixed-footer">
            <PageFooter footerColor={this.state.background} />
          </div>
        </div>

      </div>
    )
  }
}

export default ChangePassword;
