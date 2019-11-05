import React, { Component } from 'react';
import { Link } from "react-router-dom";
import HomeHeaderscreen from './homeheader';
import PageFooter from './footer';
import '../styles/styles.css';
import '../styles/login.css';
import langdata from '../../src/locales/de/registertranslation';
import LocalizedStrings from 'react-localization';
import { string } from 'prop-types';
import axios from 'axios';
const BASE_URL = `http://localhost:6003/`;

let strings = new LocalizedStrings(langdata);
console.log(strings);
const selLang = localStorage.getItem('lang');
console.log("Saved lang", selLang)
strings.setLanguage(selLang);
console.log('strings', strings)

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
    if (this.validateForm()) {
      const { fields } = this.state
      let formData = {
        id: '',
        firstname: fields.FirstName,
        lastname: fields.LastName,
        email: fields.EmailId,
        age: Number(fields.Age),
        gender: fields.Gender,
        password: fields.Password,
        username: fields.FirstName + "" + fields.LastName,
        mobileno: fields.MobileNo,
        companyname: fields.CompanyName,
        roleid :""
      }

      debugger;
      const config = {
        headers: {
          "content-type": "application/json"
        }
      };
      axios.post(BASE_URL + `rouge/user/create`, JSON.stringify(formData), config)
        .then(function (response) {
          if (response.status === 201) {
            //this.props.history.push('/dashboard');
            window.location = '/dashboard';
          }
          else if (response.status === 200) {
            alert(response.data.Message)
          }
          else {
            console.log(response.data.Message)
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

    if (!fields["CompanyName"]) {
      formIsValid = false;
      errors["CompanyName"] = "*Please enter your company name.";
    }

    if (typeof fields["CompanyName"] !== "undefined") {
      if (!fields["CompanyName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["CompanyName"] = "*Please enter alphabet characters only.";
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

    if (!fields["EmailId"]) {
      formIsValid = false;
      errors["EmailId"] = "*Please enter your email-ID.";
    }

    if (typeof fields["EmailId"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["EmailId"])) {
        formIsValid = false;
        errors["EmailId"] = "*Please enter valid Email-ID.";
      }
    }

    if (!fields["Age"]) {
      formIsValid = false;
      errors["Age"] = "*Please enter your Age.";
    }

    if (typeof fields["Age"] !== "undefined") {
      if (Number(fields["Age"]) < 18 || Number(fields["Age"]) > 100) {
        formIsValid = false;
        errors["Age"] = "*Please enter valid age .";
      }
    }

    if (!fields["Gender"]) {
      formIsValid = false;
      errors["Gender"] = "*Please select your gender.";
    }


    // if (typeof fields["Age"] !== "undefined") {
    //   if (!fields["Age"].match(/^[0-9]{10}$/)) {
    //     formIsValid = false;
    //     errors["Age"] = "*Please enter valid mobile no.";
    //   }
    // }

    if (!fields["Password"]) {
      formIsValid = false;
      errors["Password"] = "*Please enter your password.";
    }

    if (typeof fields["Password"] !== "undefined") {
      if (!fields["Password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["Password"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields["ConfirmPassword"]) {
      formIsValid = false;
      errors["ConfirmPassword"] = "*Please enter your Confirm Password.";
    }

    if (typeof fields["ConfirmPassword"] !== "undefined") {
      if (!fields["ConfirmPassword"].match(fields["Password"])) {
        formIsValid = false;
        errors["ConfirmPassword"] = "*Password not match.";
      }
    }

    // if (typeof fields["ConfirmPassword"] !== "undefined") {
    //   if (!fields["ConfirmPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["ConfirmPassword"] = "*Please enter secure and strong password.";
    //   }
    // }

    if (!fields["MobileNo"]) {
      formIsValid = false;
      errors["MobileNo"] = "*Please enter your mobile no.";
    }

    if (typeof fields["MobileNo"] !== "undefined") {
      if (!fields["MobileNo"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["MobileNo"] = "*Please enter valid mobile no.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <HomeHeaderscreen />
          <div>
            <div className="col-md-12">
              <div className="p-t-25 p-b-25">
                <div className="login100-form validate-form">
                  <span className="login100-form-title p-b-17">
                    {strings.Registration}
			        		</span>
                  <div className="col-md-12 p-t-25">
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-4">
                        <div className="p-b-25">
                          <div className="login100-form validate-form">
                            <div className="wrap-input100 validate-input">
                              <span className="label-input100">{strings.FName}</span>
                              <input className="input100" type="text" name="FirstName" placeholder={strings.FNameLablel} value={this.state.fields.FirstName || ''} onChange={this.handleChange} />
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.FirstName}</div>

                            <div className="wrap-input100 validate-input m-t-20">
                              <span className="label-input100">{strings.LName}</span>
                              <input className="input100" type="text" name="LastName" placeholder={strings.LNameLabel} value={this.state.fields.LastName || ''} onChange={this.handleChange} />
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.LastName}</div>

                            <div className="wrap-input100 validate-input m-t-20">
                              <span className="label-input100">{strings.EmailId}</span>
                              <input className="input100" type="text" name="EmailId" placeholder={strings.EmailLabel} value={this.state.fields.EmailId || ''} onChange={this.handleChange} />
                              <span className="focus-input100"><i class="far fa-envelope fa_icon"></i></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.EmailId}</div>

                            <div className="wrap-input100 validate-input m-t-20">
                              <span className="label-input100">{strings.Age}</span>
                              <input className="input100" type="number" min="18" max="100" name="Age" placeholder={strings.AgeLabel} value={this.state.fields.Age || ''} onChange={this.handleChange} />
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.Age}</div>

                            <div className="validate-input m-t-20">
                              <div className="label-input100">{strings.Gender}</div>
                              <div className="col col-md-4 floatl">
                                <label className="radio menumrgn">
                                  <input type="radio" name="Gender" value="male" checked={this.state.fields.Gender === "male"} onChange={this.handleChange} />
                                  {strings.Male}
                             </label>
                              </div>
                              <div className="col col-md-4 floatl">
                                <label className="radio menumrgn">
                                  <input type="radio" name="Gender" value="female" checked={this.state.fields.Gender === "female"} onChange={this.handleChange} />
                                  {strings.Female}
                             </label>
                              </div>
                            </div>
                            <div className="clear"></div>
                            <div className="errorMsg">{this.state.errors.Gender}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="wrap-input100 validate-input m-t-20">
                          <span className="label-input100">{strings.Password}</span>
                          <input className="input100" type="password" name="Password" placeholder={strings.PasswordLabel} value={this.state.fields.Password || ''} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.Password}</div>

                        <div className="wrap-input100 validate-input m-t-20">
                          <span className="label-input100">{strings.ConfirmPassword}</span>
                          <input className="input100" type="password" name="ConfirmPassword" placeholder={strings.ConfirmPasswordLabel} value={this.state.fields.ConfirmPassword || ''} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.ConfirmPassword}</div>

                        <div className="wrap-input100 validate-input m-t-20">
                          <span className="label-input100">{strings.MobileNumber}</span>
                          <input className="input100" type="mobileno" name="MobileNo" placeholder={strings.MobileNumberLabel} value={this.state.fields.MobileNo || ''} onChange={this.handleChange} />
                          <span className="focus-input100"><i class="fas fa-mobile-alt fa_icon"></i></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.MobileNo}</div>

                        <div className="wrap-input100 validate-input m-t-20">
                          <span className="label-input100">{strings.CompanyName}</span>
                          <input className="input100" type="text" name="CompanyName" placeholder={strings.CompanyNameLable} value={this.state.fields.CompanyName || ''} onChange={this.handleChange} />
                          <span className="focus-input100"><i class="far fa-building fa_icon"></i></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.CompanyName}</div>

                        <div className="container-login100-form-btn  m-t-20">
                          <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn" onClick={this.submituserRegistrationForm}>
                            {strings.RegistrationButton}
						        	</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>


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
