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
const BASE_URL = `http://localhost:6006/`;
const BASE_URL_ROLE = `http://localhost:6005/`;


class RolePermissionScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.RolePermissionForm = this.RolePermissionForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      roles: [],
      permissionGridData: [],
      permissions: []
    };
  }

  onOpenModal = () => {
    let fields = {};
    let errors = {};
    this.setState({ open: true, fields: fields, errors: errors });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    this.bindRolesDropdown()
    this.bindRolePermissionGrid()
    this.bindPermission()
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

  bindRolePermissionGrid() {
    axios
      .get(BASE_URL + "rouge/rolepermission/get")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            permissionGridData: response.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  bindPermission() {
    axios
      .get(BASE_URL + "rouge/permission/get")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            permissions: response.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  onChangeCheckBox(e, data) {
    let fields = this.state.fields;
    if (e.target.checked) {
      if (fields.Permission !== undefined) {
        fields["Permission"] = fields.Permission.concat([data._id])
      }
      else {
        fields["Permission"] = [data._id];
      }
    }
    else {
      fields.Permission = fields.Permission.filter(d => d !== data._id)
    }
    this.setState({ fields: fields });
  }

  onOpenEditModal = (d) => {
    let fields = this.state.fields;
    fields["_id"] = d._id;
    fields["Name"] = d.name;
    fields["Role"] = d.roleid;
    fields["Permission"] = d.permission;
    let errors = {};
    this.setState({ open: true, fields: fields, errors: errors });
  };

  onDeleteClick = (data) => {
    if (window.confirm("Are u sure to delete ?")) {
      axios.delete(BASE_URL + `rouge/rolepermission/delete/` + data._id)
        .then(response => {
          if (response.status === 200) {
            this.bindRolePermissionGrid();
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  RolePermissionForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { fields } = this.state

      let formData = {
        name: fields.Name,
        roleid: fields.Role,
        permission: fields.Permission
      }
      const config = {
        headers: {
          "content-type": "application/json"
        }
      };

      if (!fields._id) {
        axios.post(BASE_URL + `rouge/rolepermission/create`, JSON.stringify(formData), config)
          .then(response => {
            if (response.status === 200) {
              if (window.confirm("Permission already exist with same role, Are u want to override it ?")) {
                this.overridePermission(formData, response.data._id, config)
              }
            }
            else if (response.status === 201) {
              alert(response.data.Message);
              let fields = {};
              this.setState({ fields: fields });
              this.onCloseModal();
              this.bindRolePermissionGrid();
            }
          })
          .catch(error => {
            console.log(error)
          });
      } else {
        axios.put(BASE_URL + `rouge/rolepermission/update/` + fields._id, JSON.stringify(formData), config)
          .then(response => {
            alert(response.data.Message);
            if (response.status === 200) {
              let fields = {};
              this.setState({ fields: fields });
              this.onCloseModal();
              this.bindRolePermissionGrid();
            }
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
  }

  overridePermission(data, id, config) {
    axios.put(BASE_URL + `rouge/rolepermission/update/` + id, JSON.stringify(data), config)
      .then(response => {
        alert(response.data.Message);
        if (response.status === 200) {
          let fields = {};
          this.setState({ fields: fields });
          this.onCloseModal();
          this.bindRolePermissionGrid();
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["Name"]) {
      formIsValid = false;
      errors["Name"] = "*Please enter your Role Permission Name.";
    }

    if (typeof fields["Name"] !== "undefined") {
      if (!fields["Name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["Name"] = "*Please enter alphabet characters only.";
      }
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
    const useStyles = {
      height: 264,
      flexGrow: 1,
      maxWidth: 400
    }
    const BASE_URL = '#'
    const { open, roles, permissionGridData, permissions } = this.state;
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
                    <button className="btn btn-outline-light" onClick={this.RolePermissionForm}>
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
                    <h3><span className="toppdng">Role Permission </span></h3>
                  </div>
                </div>
              </div>


              {/* Role Permission Grid Start*/}
              <div className="col col-md-12">
                <div className="col col-md-12 innercontent">
                  <div className="condensed-grid">
                    <div>
                      <button type="button" className="btn btn-primary hidden-print" onClick={this.onOpenModal}> <i className="fa fa-plus-circle"></i> Add New</button>
                      <Modal open={open} onClose={this.onCloseModal}>
                        <h2 className="modelhdr">{this.state.fields._id === undefined ? `Add New Permission` : `Edit Permission`}</h2>
                        <div className="modelmenu">
                          <div className="login100-form validate-form">
                            <div className="wrap-input100 validate-input">
                              <span className="label-input100">Name:</span>
                              <input className="input100" type="text" name="Name" placeholder="Type your Role Permission Name" value={this.state.fields.Name || ''} onChange={this.handleChange} />
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.Name}</div>
                            <div className="wrap-input100 validate-input m-t-20">
                              <span className="label-input100"> Role: </span>
                              <select disabled={this.state.fields._id !== undefined} name="Role" className="input100" value={this.state.fields.Role} onChange={this.handleChange}>
                                <option selected={this.state.fields.Role === undefined} value="">-- Select Role--</option>
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
                            <div className="validate-input m-t-20">
                              <div className="label-input100">Permission:</div>
                              {
                                permissions.length > 0 ? (
                                  permissions.map((data, index) => {
                                    return (
                                      <div className="col col-md-4 floatl">
                                        <label className="radio menumrgn">
                                          <input type="checkbox" onChange={(e) => this.onChangeCheckBox(e, data)} checked={this.state.fields.Permission !== undefined ? (this.state.fields.Permission.indexOf(data._id) > -1) : false} />{data.name}
                                        </label>
                                      </div>
                                    )
                                  })
                                ) : null
                              }
                            </div>
                            <div className="clear"></div>
                            <div className="container-login100-form-btn p-t-31 p-b-25">
                              <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" onClick={this.RolePermissionForm}>
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>

                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">Name</div>
                      <div className="col gridbr">Role</div>
                      <div className="col gridbr">Description</div>
                      <div className="col gridbr">Permission</div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    {permissionGridData.length > 0 ? (
                      permissionGridData.map((data, index) => {
                        return (
                          <div className="row gridgraybg" key={index}>
                            <div className="col-sm-3 gridbr">{data.name}</div>
                            <div className="col gridbr">{roles.find(d => d._id === data.roleid) === undefined ? '' : roles.find(d => d._id === data.roleid).name || ''}</div>
                            <div className="col gridbr">{roles.find(d => d._id === data.roleid) === undefined ? '' : roles.find(d => d._id === data.roleid).description || ''}</div>
                            <div className="col gridbr"> <span>{data.permission.join(", ")}</span> </div>
                            <div className="col-sm-1 gridbr textcenter">
                              <button type="button" className="hidden-print" onClick={() => this.onOpenEditModal(data)}> <i className="fas fa-edit iconcolor"></i></button>
                            </div>
                            <div className="col-sm-1 gridbr textcenter">
                              <button type="button" className="hidden-print" onClick={() => this.onDeleteClick(data)}> <i className="fas fa-trash-alt iconcolor"></i></button>
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
              {/* Role Permission Grid End*/}

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

export default RolePermissionScreen;
