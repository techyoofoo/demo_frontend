import React, { Component } from 'react';
import { Link } from "react-router-dom";
import HomeHeaderscreen from './homeheader';
import PageFooter from './footer';
import '../styles/styles.css';
import '../styles/login.css';
const axios = require('axios');

class RegisterScreen extends Component {

  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
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
    if (!this.validateForm()) {
      // let fields = {};
      // fields["FirstName"] = "";
      // fields["LastName"] = "";
      // fields["emailid"] = "";
      // fields["password"] = "";
      // this.setState({ fields: fields });
      // alert("Form submitted");
      var jsonData = {
        "ApiAuthentication":
        {
          "LoginName": "chalkapi",
          "Password": "5PhHK339B76k2eM8",
          "Company": "chalkcouture"
        },
        "User":{ 
          "FirstName":this.state.fields.FirstName,
          "LastName":this.state.fields.LastName,
          "CustomerType":1,
          "CustomerStatus":1,
          "Email":this.state.fields.emailid,
          "CanLogin":1,
          "LoginName":this.state.fields.emailid,
          "LoginPassword":this.state.fields.password,
          "CurrencyCode":"USD",
          "LanguageID":1
       }
      }
     debugger;
      // Optionally the request above could also be done as
      axios.post('http://localhost:3000/rogue/yoofoo/usermodeule/register', {
          data: jsonData
      })
        .then(function (response) {
          if(response.data.Message.Result !==undefined && response.data.Message.Result[0].Status==="Success")
          {
            //this.props.history.push('/dashboard');
            window.location='/dashboard';
          }
          else{
            console.log(response.data.Message);
          }
          
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });  

      //this.props.history.push('/dashboard');
      // alert("Form submitted");
    }

  }
  
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["FirstName"]) {
      formIsValid = false;
      errors["FirstName"] = "*Please enter your first name.";
    }

    if (typeof fields["FirstName"] !== "undefined") {
      if (!fields["FirstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["FirstName"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["LastName"]) {
      formIsValid = false;
      errors["LastName"] = "*Please enter your last name.";
    }

    if (typeof fields["LastName"] !== "undefined") {
      if (!fields["LastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["LastName"] = "*Please enter alphabet characters only.";
      }
    }

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

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields["ConfirmPassword"]) {
      formIsValid = false;
      errors["ConfirmPassword"] = "*Please enter your Confirm Password.";
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

  render() {
    const BASE_URL = '#'
    return (
      <div>
        <div className="container-fluid">
          <HomeHeaderscreen />
          <div className="">
          <div className="row Loginvbg container-login100">

            <div className="col-sm-4">

              <div className="wrap-login100 p-l-55 p-r-55 p-t-25 p-b-25">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-17">
                    Register
			        		</span>

                  <div className="wrap-input100 validate-input">
                    <span className="label-input100">First Name</span>
                    <input className="input100" type="text" name="FirstName" placeholder="Type your first name" value={this.state.fields.FirstName} onChange={this.handleChange} />
                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.FirstName}</div>

                  <div className="wrap-input100 validate-input m-t-20">
                    <span className="label-input100">Last Name</span>
                    <input className="input100" type="text" name="LastName" placeholder="Type your last name" value={this.state.fields.LastName} onChange={this.handleChange} />
                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.LastName}</div>

                  <div className="wrap-input100 validate-input m-t-20">
                    <span className="label-input100">Email Id</span>
                    <input className="input100" type="text" name="emailid" placeholder="Type your email Id" value={this.state.fields.emailid} onChange={this.handleChange} />
                    <span className="focus-input100"><i class="far fa-envelope fa_icon"></i></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.emailid}</div>

                  <div className="wrap-input100 validate-input m-t-20">
                    <span className="label-input100">Password</span>
                    <input className="input100" type="password" name="password" placeholder="Type your password" value={this.state.fields.password} onChange={this.handleChange} />
                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.password}</div>

                  <div className="wrap-input100 validate-input m-t-20">
                    <span className="label-input100">Confirm Password</span>
                    <input className="input100" type="password" name="confirmpassword" placeholder="Type your confirm password" value={this.state.fields.ConfirmPassword} onChange={this.handleChange} />
                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.ConfirmPassword}</div>

                  <div class="m-t-20 checkbox checkp">
                    <input type="checkbox" class="form-check-input" />
                    <label for="customCheck">Show my password</label>
                  </div>

                  <div className="container-login100-form-btn  m-t-20">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" onClick={this.submituserRegistrationForm}>
                        Registration
						        	</button>
                    </div>
                  </div>
                </form>
              </div>
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

export default RegisterScreen;
