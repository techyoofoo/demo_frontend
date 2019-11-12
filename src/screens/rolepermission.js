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
const BASE_URL_PERMISSION = `http://localhost:6012/`;


class RolePermissionScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handlePermissionChanges = this.handlePermissionChanges.bind(this);
    this.RolePermissionForm = this.RolePermissionForm.bind(this);
    this.PermissionForm = this.PermissionForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      openPermissionModal: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      permissionErrors: {},
      permissionFields: {},
      roles: [],
      rolePermissions: [],
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

  onOpenPermissionModal = () => {
    let fields = {};
    let errors = {};
    this.setState({ openPermissionModal: true, permissionFields: fields, permissionErrors: errors });
  };

  onClosePermissionModal = () => {
    this.setState({ openPermissionModal: false });
  };

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    this.getRoles()
    this.getRolePermissions()
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

  getRoles() {
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

  getRolePermissions() {
    axios
      .get(BASE_URL + "rouge/rolepermission/get")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            rolePermissions: response.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  bindPermission() {
    axios
      .get(BASE_URL_PERMISSION + "rouge/permission/get")
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

  handlePermissionChanges(e) {
    let fields = this.state.permissionFields;
    fields[e.target.name] = e.target.value;
    this.setState({
      permissionFields: fields
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
    var rolePermissions = this.state.rolePermissions;
    let rolePermission = rolePermissions.find(x => x.roleid === d._id);
    let fields = {};
    fields["Name"] = d.name;
    if (rolePermission !== undefined) {
      fields["_id"] = rolePermission._id;
      fields["Role"] = rolePermission.roleid;
      fields["Permission"] = rolePermission.permission;
    }
    else {
      fields["Role"] = d._id;
    }
    let errors = {};
    this.setState({ open: true, fields: fields, errors: errors });
  };

  onDeleteClick = (data) => {
    var rolePermissions = this.state.rolePermissions;
    let rolePermission = rolePermissions.find(x => x.roleid === data._id);
    if (rolePermission !== undefined) {
      if (window.confirm("Are u sure to remove all permission from  " + data.name + " ?")) {
        axios.delete(BASE_URL + `rouge/rolepermission/delete/` + rolePermission._id)
          .then(response => {
            if (response.status === 200) {
              this.getRolePermissions();
              alert("Successfully removed all permission from " + data.name)
            }
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
    else {
      alert(data.name + " has no permission")
    }
  }

  RolePermissionForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { fields } = this.state
      let formData = {
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
            alert(response.data.Message);
            if (response.status === 201) {
              let fields = {};
              this.setState({ fields: fields });
              this.onCloseModal();
              this.getRolePermissions();
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
              this.getRolePermissions();
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

    if (fields.Permission === undefined || fields.Permission.length === 0) {
      formIsValid = false;
      errors["Permission"] = "*Please select permission.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }


  PermissionForm(e) {
    e.preventDefault();
    if (this.validatePermissionForm()) {
      const { permissionFields } = this.state

      let formData = {
        _id: permissionFields.Name.toLowerCase(),
        name: permissionFields.Name.slice(0, 1).toUpperCase() + permissionFields.Name.slice(1, permissionFields.Name.length).toLowerCase()
      }

      const config = {
        headers: {
          "content-type": "application/json"
        }
      };

      axios.post(BASE_URL_PERMISSION + `rouge/permission/create`, JSON.stringify(formData), config)
        .then(response => {
          alert(response.data.Message);
          if (response.status === 201) {
            let fields = {};
            this.setState({ permissionFields: fields });
            //this.onClosePermissionModal();
            this.bindPermission()
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  validatePermissionForm() {
    let fields = this.state.permissionFields;
    let errors = {};
    let formIsValid = true;

    if (!fields["Name"]) {
      formIsValid = false;
      errors["Name"] = "*Please enter your Permission Name.";
    }
    if (typeof fields["Name"] !== "undefined") {
      if (!fields["Name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["Name"] = "*Please enter alphabet characters only.";
      }
    }

    this.setState({
      permissionErrors: errors
    });
    return formIsValid;
  }

  onDeletePermissionClick(d) {
    if (window.confirm("Are u sure to delete permission?")) {
      axios.all([
        axios.delete(BASE_URL_PERMISSION + `rouge/permission/delete/` + d._id),
        axios.delete(BASE_URL + `rouge/rolepermission/deletepermission/` + d._id)
      ])
        .then(axios.spread((permissionRes, rolePermissionRes) => {
          if (permissionRes.status === 200) {
            this.bindPermission();
            this.getRolePermissions();
            //this.onCloseModal();
          }
          if (rolePermissionRes.status === 200) {
            let fields = this.state.fields;
            fields["Permission"] = fields.Permission.filter(x => x !== d._id);
            this.setState({ fields: fields })
          }
        })).catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    const useStyles = {
      height: 264,
      flexGrow: 1,
      maxWidth: 400
    }
    const BASE_URL = '#'
    const { open, roles, permissions, openPermissionModal } = this.state;
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

              <div className="col col-md-12">
                <div className="col col-md-12 innercontent">

                  <div className="condensed-grid">
                    <div>
                      {/* <button type="button" className="btn btn-primary hidden-print" onClick={this.onOpenModal}> <i className="fa fa-plus-circle"></i> Add New Role Permission</button> */}

                      <Modal open={open} onClose={this.onCloseModal}>
                        <h2 className="modelhdr">{this.state.fields.Name + ` Permission`}</h2>
                        <div className="modelmenu">
                          <div className="login100-form validate-form">
                            <div className="validate-input m-t-20">
                              <div className="row">
                                <div className="col-sm-6">
                                  Permissions:
                                </div>
                                <div className="col-sm-6">
                                  <button type="button" style={{ float: "right" }} className="btn btn-info hidden-print" onClick={this.onOpenPermissionModal}> <i className="fa fa-plus-circle"></i> Add/Remove Permission</button>
                                </div>
                              </div>
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
                            <div className="errorMsg">{this.state.errors.Permission}</div>
                            <div className="container-login100-form-btn p-t-31 p-b-25">
                              <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" onClick={this.RolePermissionForm}>
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>



                      <Modal open={openPermissionModal} onClose={this.onClosePermissionModal}>
                        <h2 className="modelhdr"> Permission </h2>
                        <div className="modelmenu">
                          <div className="col col-md-12">
                            <div className="col col-md-12 innercontent">

                              <div className="login100-form validate-form">
                                <div className="row">
                                  <div className="col-sm-8">
                                    <div className="wrap-input100 validate-input">
                                      <span className="label-input100">Name:</span>
                                      <input className="input100" type="text" name="Name" placeholder="Type your Permission Name" value={this.state.permissionFields.Name || ''} onChange={this.handlePermissionChanges} />
                                      <span className="focus-input100" data-symbol="&#xf206;"></span>
                                    </div>
                                    <div className="errorMsg">{this.state.permissionErrors.Name}</div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="container-login100-form-btn p-t-31 p-b-25">
                                      <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" onClick={this.PermissionForm}>
                                          Add
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="container">
                                <div className="row gridgraybg">
                                  <div className="col-sm-6 gridbr">Permission Name</div>
                                  <div className="col gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                                </div>
                                {permissions.length > 0 ? (
                                  permissions.map((data, index) => {
                                    return (
                                      <div className="row gridgraybg" key={index}>
                                        <div className="col-sm-6 gridbr">{data.name}</div>
                                        <div className="col gridbr textcenter">
                                          <button type="button" className="hidden-print" onClick={() => this.onDeletePermissionClick(data)}> <i className="fas fa-trash-alt iconcolor"></i></button>
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
                        </div>
                      </Modal>
                    </div>
                  </div>

                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">Role Name</div>
                      <div className="col gridbr">Role Description</div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    {roles.length > 0 ? (
                      roles.map((data, index) => {
                        return (
                          <div className="row gridgraybg" key={index}>
                            <div className="col-sm-3 gridbr">{data.name}</div>
                            <div className="col gridbr">{data.description}</div>
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
