import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
import Modal from "react-responsive-modal";
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const BASE_URL = `http://localhost:6003/`;
const BASE_URL_ROLE = `http://localhost:6005/`;

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
      errors: {},
      roles: [],
      users: [],
      usersGridData: []
    };
  }

  onOpenModal = () => {
    let fields = {}
    let errors = {}
    this.setState({ open: true, fields: fields, errors: errors });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    this.bindRolesDropdown()
    this.bindUsersGrid()
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

  bindRolesDropdown() {
    axios
      .get(BASE_URL_ROLE + "rouge/role/get")
      .then((response) => {
        this.setState({
          roles: response.data
        });
      })
      .catch(error => {
        console.log(error)
      });
  }

  bindUsersGrid() {
    axios
      .get(BASE_URL + "rouge/user/get")
      .then((response) => {
        this.setState({
          users: response.data,
          usersGridData: response.data
        });
      })
      .catch(error => {
        console.log(error)
      });
  }


  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields: fields
    });
  }

  searchUser(e) {
    const { users } = this.state
    if (e.target.value.length > 0) {
      let gridData = users.filter(d => d.firstname.toLowerCase().includes(e.target.value.toLowerCase()))
      this.setState({
        usersGridData: gridData
      });
    }
    else if (e.target.value === "") {
      this.setState({
        usersGridData: users
      });
    }

  }


  onOpenEditModal(data) {
    let fields = this.state.fields;
    fields["_id"] = data._id;
    fields["FirstName"] = data.firstname;
    fields["LastName"] = data.lastname;
    fields["EmailId"] = data.email;
    fields["Age"] = data.age;
    fields["Gender"] = data.gender;
    fields["Password"] = data.password;
    fields["ConfirmPassword"] = data.password;
    fields["MobileNo"] = data.mobileno;
    fields["UserType"] = data.usertype;
    fields["Role"] = data.roleid;
    fields["CompanyName"] = data.companyname;
    let errors = {};
    this.setState({ open: true, fields: fields, errors: errors });
  }

  onDeleteClick(id) {
    if (window.confirm("Are u sure to delete ?")) {
      axios.delete(BASE_URL + `rouge/user/delete/` + id)
        .then(response => {
          if (response.status === 200) {
            this.bindUsersGrid()
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  UserForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { fields } = this.state
      let formData = {
        firstname: fields.FirstName,
        lastname: fields.LastName,
        email: fields.EmailId,
        age: Number(fields.Age),
        gender: fields.Gender,
        password: fields.Password,
        username: fields.FirstName + "" + fields.LastName,
        mobileno: fields.MobileNo,
        usertype: fields.UserType,
        roleid: fields.Role,
        companyname: fields.CompanyName,
      }
      const config = {
        headers: {
          "content-type": "application/json"
        }
      };
      if (!fields._id) {
        axios.post(BASE_URL + `rouge/user/create`, JSON.stringify(formData), config)
          .then(response => {
            alert(response.data.Message);
            if (response.status === 201) {
              let fields = {};
              this.setState({ fields: fields });
              this.bindUsersGrid();
              this.onCloseModal();
            }
          })
          .catch(error => {
            console.log(error)
          });
      }
      else {
        axios.put(BASE_URL + `rouge/user/update/` + fields._id, JSON.stringify(formData), config)
          .then(response => {
            alert(response.data.Message);
            if (response.status === 200) {
              let fields = {};
              this.setState({ fields: fields });
              this.bindUsersGrid();
              this.onCloseModal();
            }
          })
          .catch(error => {
            console.log(error)
          });
      }
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
    const { open, roles, usersGridData } = this.state;
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

              {/* user's grid start */}
              <div className="col col-md-12">
                <div className="col col-md-12 innercontent">
                  <div className="condensed-grid">
                    <div>
                      <div>
                        <div className="col col-md-4 col-sm-12">
                          <div className="wrap-input100 validate-input">
                            <input className="input100" onKeyUp={(e) => this.searchUser(e)} type="text" name="SearchText" placeholder="Search" />
                            <span style={{ color: "#a99d9d" }} className="focus-input100 fa fa-search"></span>
                          </div>
                        </div>
                        <div style={{ float: "right" }} className="col col-md-4 col-sm-12">
                          <button type="button" className="btn btn-primary hidden-print" onClick={this.onOpenModal}> <i className="fa fa-plus-circle"></i> Add New</button>
                        </div>
                      </div>
                      <div className="clear"></div>
                      <Modal open={open} onClose={this.onCloseModal}>
                        <h2 className="modelhdr">{this.state.fields._id === undefined ? `Add New` : `Edit User`}</h2>
                        <div className="modelmenu" style={{ width: "800px" }}>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="p-l-55 p-r-55 p-b-25">
                                <div className="login100-form validate-form">
                                  <div className="wrap-input100 validate-input">
                                    <span className="label-input100">First Name</span>
                                    <input className="input100" type="text" name="FirstName" placeholder="Type your first name" value={this.state.fields.FirstName || ''} onChange={this.handleChange} />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                  </div>
                                  <div className="errorMsg">{this.state.errors.FirstName}</div>

                                  <div className="wrap-input100 validate-input m-t-20">
                                    <span className="label-input100">Last Name</span>
                                    <input className="input100" type="text" name="LastName" placeholder="Type your last name" value={this.state.fields.LastName || ''} onChange={this.handleChange} />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                  </div>
                                  <div className="errorMsg">{this.state.errors.LastName}</div>

                                  <div className="wrap-input100 validate-input m-t-20">
                                    <span className="label-input100">Email Id</span>
                                    {
                                      this.state.fields._id !== undefined ? (
                                        <input className="input100" data-toggle="tooltip" data-placement="top" title="Email id not editable" disabled type="text" name="EmailId" placeholder="Type your email Id" value={this.state.fields.EmailId || ''} onChange={this.handleChange} />
                                      ) : (
                                          <input className="input100" type="text" name="EmailId" placeholder="Type your email Id" value={this.state.fields.EmailId || ''} onChange={this.handleChange} />
                                        )
                                    }
                                    <span className="focus-input100"><i class="far fa-envelope fa_icon"></i></span>
                                  </div>
                                  <div className="errorMsg">{this.state.errors.EmailId}</div>

                                  <div className="wrap-input100 validate-input m-t-20">
                                    <span className="label-input100">Age</span>
                                    <input className="input100" type="number" min="18" max="100" name="Age" placeholder="Type your Age" value={this.state.fields.Age || ''} onChange={this.handleChange} />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                  </div>
                                  <div className="errorMsg">{this.state.errors.Age}</div>

                                  <div className="validate-input m-t-20">
                                    <div className="label-input100">Gender</div>
                                    <div className="col col-md-4 floatl">
                                      <label className="radio menumrgn">
                                        <input type="radio" name="Gender" value="male" checked={this.state.fields.Gender === "male"} onChange={this.handleChange} />
                                        Male
                                       </label>
                                    </div>
                                    <div className="col col-md-4 floatl">
                                      <label className="radio menumrgn">
                                        <input type="radio" name="Gender" value="female" checked={this.state.fields.Gender === "female"} onChange={this.handleChange} />
                                        Female
                                      </label>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                  <div className="errorMsg">{this.state.errors.Gender}</div>

                                  <div className="wrap-input100 validate-input m-t-20">
                                    <span className="label-input100">Password</span>
                                    <input className="input100" type="password" name="Password" placeholder="Type your password" value={this.state.fields.Password || ''} onChange={this.handleChange} />
                                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                                  </div>
                                  <div className="errorMsg">{this.state.errors.Password}</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="wrap-input100 validate-input">
                                <span className="label-input100">Confirm Password</span>
                                <input className="input100" type="password" name="ConfirmPassword" placeholder="Type your confirm password" value={this.state.fields.ConfirmPassword || ''} onChange={this.handleChange} />
                                <span className="focus-input100" data-symbol="&#xf190;"></span>
                              </div>
                              <div className="errorMsg">{this.state.errors.ConfirmPassword}</div>

                              <div className="wrap-input100 validate-input m-t-20">
                                <span className="label-input100">Mobile No</span>
                                <input className="input100" type="mobileno" name="MobileNo" placeholder="Type your mobile no" value={this.state.fields.MobileNo || ''} onChange={this.handleChange} />
                                <span className="focus-input100"><i class="fas fa-mobile-alt fa_icon"></i></span>
                              </div>
                              <div className="errorMsg">{this.state.errors.MobileNo}</div>

                              <div className="wrap-input100 validate-input m-t-20">
                                <span className="label-input100"> User Type</span>
                                <select name="UserType" className="input100" value={this.state.fields.UserType || ""} onChange={this.handleChange}>
                                  <option value="">-- Select --</option>
                                  <option value="ANONYMOUS">ANONYMOUS</option>
                                  <option value="CUSTOMER">CUSTOMER</option>
                                </select>
                              </div>
                              <div className="errorMsg">{this.state.errors.UserType}</div>

                              <div className="wrap-input100 validate-input m-t-20">
                                <span className="label-input100"> Role</span>
                                <select className="input100" name="Role" value={this.state.fields.Role || ""} onChange={this.handleChange}>
                                  <option value="">-- Select --</option>
                                  {roles.length > 0 ? (
                                    roles.map((data, index) => {
                                      return (
                                        <option key={index} value={data._id}> {data.name}</option>
                                      );
                                    })
                                  ) : (
                                      null
                                    )}
                                </select>
                              </div>
                              <div className="errorMsg">{this.state.errors.Role}</div>

                              <div className="wrap-input100 validate-input m-t-20">
                                <span className="label-input100">Company Name</span>
                                <input className="input100" type="text" name="CompanyName" placeholder="Type your company name" value={this.state.fields.CompanyName || ''} onChange={this.handleChange} />
                                <span className="focus-input100"><i class="far fa-building fa_icon"></i></span>
                              </div>
                              <div className="errorMsg">{this.state.errors.CompanyName}</div>

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
                      </Modal>
                    </div>
                  </div>

                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="col-sm-1 gridbr">Name</div>
                      <div className="col-sm-2 gridbr">Email</div>
                      <div className="col-sm-2 gridbr">Mobile</div>
                      <div className="col-sm-2 gridbr">Type</div>
                      <div className="col-sm-2 gridbr">Role</div>
                      <div className="col-sm-1 gridbr">Company</div>
                      <div className="col gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                      <div className="col gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    {usersGridData.length > 0 ? (
                      usersGridData.map((data, index) => {
                        return (
                          <div className="row gridgraybg" key={index}>
                            <div className="col-sm-1 gridbr">{data.firstname}</div>
                            <div className="col-sm-2 gridbr">{data.email}</div>
                            <div className="col-sm-2 gridbr">{data.mobileno}</div>
                            <div className="col-sm-2 gridbr">{data.usertype}</div>
                            <div className="col-sm-2 gridbr">{roles.find(d => d._id === data.roleid) === undefined ? '' : roles.find(d => d._id === data.roleid).name || ''}</div>
                            <div className="col-sm-1 gridbr">{data.companyname}</div>
                            <div className="col gridbr textcenter">
                              <button type="button" className="hidden-print" onClick={() => this.onOpenEditModal(data)}> <i className="fas fa-edit iconcolor"></i></button>
                            </div>
                            <div className="col gridbr textcenter">
                              <button type="button" className="hidden-print" onClick={() => this.onDeleteClick(data._id)}> <i className="fas fa-trash-alt iconcolor"></i></button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                        <p><center>No records found..</center></p>
                      )}
                  </div>
                </div>
              </div>
              {/* user's grid end */}
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
