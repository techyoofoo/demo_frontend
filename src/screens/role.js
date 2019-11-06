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
const BASE_URL = `http://localhost:6005/`;

class RoleScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.RoleForm = this.RoleForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      roles: []
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
    this.bindRoleGrid();
  }

  SideNavBarcloseClick = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  SideNavBaropenClick = () => {
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

  bindRoleGrid() {
    axios
      .get(BASE_URL + "rouge/role/get")
      .then((response) => {
        this.setState({
          roles: response.data,
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
      fields
    });
  }

  onOpenEditModal = (data) => {
    this.setState({ open: true });
    let fields = this.state.fields;
    fields["_id"] = data._id;
    fields["Name"] = data.name;
    fields["Description"] = data.description;
    this.setState({ fields: fields });
  };

  onDeleteClick = (data) => {
    if (window.confirm("Are u sure to delete ?")) {
      axios.delete(BASE_URL + `rouge/role/delete/` + data._id)
        .then(response => {
          if (response.status === 200) {
            this.bindRoleGrid();
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  RoleForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { fields } = this.state;
      let formData = {
        name: fields.Name,
        description: fields.Description
      }
      const config = {
        headers: {
          "content-type": "application/json"
        }
      };

      if (!fields._id) {
        axios.post(BASE_URL + `rouge/role/create`, JSON.stringify(formData), config)
          .then(response => {
            alert(response.data.Message);
            if (response.status === 201) {
              let fields = {};
              this.setState({ fields: fields });
              this.bindRoleGrid();
              this.onCloseModal();
            }
          })
          .catch(error => {
            console.log(error)
          });
      } else {
        axios.put(BASE_URL + `rouge/role/update/` + fields._id, JSON.stringify(formData), config)
          .then(response => {
            alert(response.data.Message);
            if (response.status === 200) {
              let fields = {};
              this.setState({ fields: fields });
              this.bindRoleGrid();
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

    if (!fields["Name"]) {
      formIsValid = false;
      errors["Name"] = "*Please enter name.";
    }

    if (typeof fields["Name"] !== "undefined") {
      if (!fields["Name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["Name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["Description"]) {
      formIsValid = false;
      errors["Description"] = "*Please enter Description.";
    }

    // if (typeof fields["Description"] !== "undefined") {
    //   //regular expression for Description validation
    //   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //   if (!pattern.test(fields["Description"])) {
    //     formIsValid = false;
    //     errors["Description"] = "*Please enter Description.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;

  }

  render() {
    const BASE_URL = '#'
    const { open, roles } = this.state;
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
                    <button className="btn btn-outline-light" onClick={this.RoleForm}>
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
                      <a className="navbar-minimalize minimalize-styl-2 btn btn-primary navbaralign" onClick={this.SideNavBaropenClick}>
                        <i className="fa fa-bars"></i> </a>
                    </div>
                    <h3><span className="toppdng">Role </span></h3>
                  </div>
                </div>
              </div>



              <div className="col col-md-12">
                <div className="col col-md-12 innercontent">
                  <div className="condensed-grid">
                    <div>
                      <button type="button" className="btn btn-primary hidden-print" onClick={this.onOpenModal}> <i className="fa fa-plus-circle"></i> Add New</button>
                      <Modal open={open} onClose={this.onCloseModal}>
                        <h2 className="modelhdr">{this.state.fields._id === undefined ? `Add New` : `Edit Role`}</h2>
                        <div className="modelmenu">
                          <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                            <form className="login100-form validate-form">
                              <div className="wrap-input100 validate-input">
                                <span className="label-input100"> Name</span>
                                <input className="input100" type="text" name="Name" placeholder="name" value={this.state.fields.Name || ''} onChange={this.handleChange} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                              </div>
                              <div className="errorMsg">{this.state.errors.Name}</div>
                              <div className="form-group formrgn1 p-t-25 ">
                                <div className="input-group">
                                  <span className="input-group-addon">
                                    <span className="fa fa-address-card facolor" aria-hidden="true" />
                                  </span>
                                  <textarea className="form-control" name="Description" placeholder="Description" rows="4" cols="50" value={this.state.fields.Description || ''} onChange={this.handleChange}>
                                  </textarea>
                                  <div className="errorMsg">{this.state.errors.Description}</div>
                                </div>
                              </div>
                              <div className="clear"></div>
                              <div className="container-login100-form-btn m-t-20">
                                <div className="wrap-login100-form-btn">
                                  <div className="login100-form-bgbtn"></div>
                                  <button className="login100-form-btn" onClick={this.RoleForm}>
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>

                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">Name</div>
                      <div className="col gridbr">Description</div>
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
                              {/* <i className="fas fa-edit iconcolor"></i> */}
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

              {/* <div className="col-md-12 p-t-25">
                <div className="row">
                  <div className="col-sm-5">
                    <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                      <form className="login100-form validate-form">
                        <div className="wrap-input100 validate-input">
                          <span className="label-input100"> Name</span>
                          <input className="input100" type="text" name="Name" placeholder="name" value={this.state.fields.Name || ''} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.Name}</div>

                        <div className="form-group formrgn1 p-t-25 ">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <span className="fa fa-address-card facolor" aria-hidden="true" />
                            </span>
                            <textarea className="form-control" name="Description" placeholder="Description" rows="4" cols="50" value={this.state.fields.Description || ''} onChange={this.handleChange}>
                            </textarea>
                            <div className="errorMsg">{this.state.errors.Description}</div>
                          </div>
                        </div>

                        <div className="clear"></div>
                        <div className="container-login100-form-btn m-t-20">
                          <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn" onClick={this.RoleForm}>
                              Submit
                           </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div> */}

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

export default RoleScreen;
