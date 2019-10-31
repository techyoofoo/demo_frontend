import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class UserScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.UserForm = this.UserForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {}
    };
  }

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
  }
  SideNavBarcloseClick = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  SideNvaBaropenClick = () => {
    if (!this.state.sidebarClose) {
      this.setState({ sidebarClose: true });
      document.getElementById("mySidenav").style.width = "200px";
      document.getElementById("main").style.marginLeft = "200px";
    }
    else {
      this.setState({ sidebarClose: false })
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
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


  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }
  UserForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["FirstName"] = "";
      fields["LastName"] = "";
      fields["emailid"] = "";
      fields["Age"] = "";
      fields["password"] = "";
      fields["ConfirmPassword"] = "";
      fields["mobileno"] = "";
      fields["companyname"] = "";
      fields["UserType"] = "";
      fields["Role"] = "";
      this.setState({ fields: fields });
      alert("Form submitted");
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

    if (!fields["companyname"]) {
      formIsValid = false;
      errors["companyname"] = "*Please enter your company name.";
    }

    if (typeof fields["companyname"] !== "undefined") {
      if (!fields["companyname"].match(/^[a-zA-Z ]*$/)) {
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

    if (!fields["Age"]) {
      formIsValid = false;
      errors["Age"] = "*Please enter your Age.";
    }

    // if (typeof fields["Age"] !== "undefined") {
    //   if (!fields["Age"].match(/^[0-9]{10}$/)) {
    //     formIsValid = false;
    //     errors["Age"] = "*Please enter valid mobile no.";
    //   }
    // }

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

    if (!fields["mobileno"]) {
      formIsValid = false;
      errors["mobileno"] = "*Please enter your mobile no.";
    }

    if (typeof fields["mobileno"] !== "undefined") {
      if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter valid mobile no.";
      }
    }

    if (!fields["UserType"]) {
      formIsValid = false;
      errors["UserType"] = "*Please select user type.";
    }

    if (!fields["Role"]) {
      formIsValid = false;
      errors["Role"] = "*Please select role.";
    }


    this.setState({
      errors: errors
    });
    return formIsValid;
  }

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
    return (
      <div>
        <div className="container-fluid">
          {/* <PageHeader headerColor={this.state.background}/> */}
          <div className="row fixed-header" style={styleBack1}>
            <div className="col col-sm-6 col-md-2">
              <div className="logo" style={styleBack}>
                <Link to="/dashboard">
                  <img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img>
                </Link>
              </div>
            </div>
            <div className="col col-sm-6 col-md-10 textalign changepassword">
              <div className="innerlinks">
                <ul>
                  <li>
                    <button className="btn btn-outline-light" onClick={this.UserForm}>
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
          <div>
            <Sidebarmenu sidebarCloseProp={this.state.sidebarClose} />
            <div id="main">
              <div className="row sidebarhdr">
                <div className="col-md-12">
                  <div className="row">
                    <div className="navbar-header">
                      <a className="navbar-minimalize minimalize-styl-2 btn btn-primary navbaralign" onClick={this.SideNvaBaropenClick}>
                        <i className="fa fa-bars"></i> </a>
                    </div>
                    <h3><span className="toppdng">User </span></h3>
                  </div>
                </div>
              </div>

              <div className="col-md-12 p-t-25">
                <div className="row">
                  <div className="col-sm-5">
                    <div className="p-l-55 p-r-55 p-b-25">
                      <div className="login100-form validate-form">
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
                          <span className="label-input100">Age</span>
                          <input className="input100" type="text" name="Age" placeholder="Type your Age" value={this.state.fields.Age} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.Age}</div>

                        <div className="validate-input m-t-20">
                          <div className="label-input100">Gender</div>
                          <div className="col col-md-4 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="type" value="menu" checked={this.state.fields.type === "menu"} onChange={this.handleChange} />
                              Male
                                 </label>
                          </div>
                          <div className="col col-md-4 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="type" value="submenu" checked={this.state.fields.type === "submenu"} onChange={this.handleChange} />
                              Female
                                </label>
                          </div>
                        </div>
                        <div className="clear"></div>
                        <div className="wrap-input100 validate-input m-t-20">
                          <span className="label-input100">Password</span>
                          <input className="input100" type="password" name="password" placeholder="Type your password" value={this.state.fields.password} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.password}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="wrap-input100 validate-input">
                      <span className="label-input100">Confirm Password</span>
                      <input className="input100" type="password" name="confirmpassword" placeholder="Type your confirm password" value={this.state.fields.ConfirmPassword} onChange={this.handleChange} />
                      <span className="focus-input100" data-symbol="&#xf190;"></span>
                    </div>
                    <div className="errorMsg">{this.state.errors.ConfirmPassword}</div>

                    <div className="wrap-input100 validate-input m-t-20">
                      <span className="label-input100">Mobile No</span>
                      <input className="input100" type="mobileno" name="mobileno" placeholder="Type your mobile no" value={this.state.fields.mobileno} onChange={this.handleChange} />
                      <span className="focus-input100"><i class="fas fa-mobile-alt fa_icon"></i></span>
                    </div>
                    <div className="errorMsg">{this.state.errors.mobileno}</div>

                    <div className="wrap-input100 validate-input m-t-20">
                      <span className="label-input100"> User Type</span>
                      <select className="input100" value={this.state.fields.UserType} onChange={this.handleChange}>
                        <option>-- Select --</option>
                        <option>ANONYMOUS</option>
                        <option>CUSTOMER</option>
                      </select>
                    </div>
                    <div className="errorMsg">{this.state.errors.UserType}</div>

                    <div className="wrap-input100 validate-input m-t-20">
                      <span className="label-input100"> Role</span>
                      <select className="input100" value={this.state.fields.Role} onChange={this.handleChange}>
                        <option>-- Select --</option>
                        <option>Role 1</option>
                        <option>Role 2</option>
                      </select>
                    </div>
                    <div className="errorMsg">{this.state.errors.Role}</div>

                    <div className="wrap-input100 validate-input m-t-20">
                      <span className="label-input100">Company Name</span>
                      <input className="input100" type="text" name="companyname" placeholder="Type your company name" value={this.state.fields.companyname} onChange={this.handleChange} />
                      <span className="focus-input100"><i class="far fa-building fa_icon"></i></span>
                    </div>
                    <div className="errorMsg">{this.state.errors.companyname}</div>

                    <div className="container-login100-form-btn p-t-31 p-b-25">
                      <div className="wrap-login100-form-btn">
                        <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn" onClick={this.UserForm}>
                          Submit
                           </button>
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

      </div >
    )
  }
}

export default UserScreen;
