import React, { Component } from 'react';
import { Link } from "react-router-dom";
import HomeHeaderscreen from './homeheader';
import PageFooter from './footer';
import '../App.css';
import '../styles/styles.css';
import '../styles/login.css';

class ForgotPassword extends Component {

  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };
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
      console.log('Fields Message', fields);
      fields["emailid"] = "";
      this.setState({ fields: fields });
      this.props.history.push('/login');
      // alert("Form submitted");
    }

  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    console.log('Error Message', this.state.errors, '-----------', errors);
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  render() {
    const BASE_URL = '#'
    return (
      <div>
        <div className="container-fluid">
          <HomeHeaderscreen />
          <div className="row Loginvbg container-login100">
            <div className="col-sm-2"></div>
            <div className="col-sm-4">

              <div className="wrap-login100 p-l-55 p-r-55 p-t-25 p-b-25">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-49">
                    Forgot Password
			        		</span>
                  <div className="wrap-input100 validate-input">
                    <span className="label-input100">Email Id</span>
                    <input className="input100" type="text" name="emailid" placeholder="Type your Email Id" value={this.state.fields.emailid} onChange={this.handleChange} />
                    <span className="focus-input100"><i class="far fa-envelope fa_icon"></i></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.emailid}</div>

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
          <div className="fixed-footer">
            <PageFooter footerColor={this.state.background} />
          </div>
        </div>

      </div>
    )
  }
}

export default ForgotPassword;
