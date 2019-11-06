import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const BASE_URL = `http://localhost:6008/`;

class MenuScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.MenuForm = this.MenuForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      menus: [],
      gridData: [],
      openEdit: false
    };
  }
  onOpenModal = () => {
    let fields = this.state.fields;
    fields["state"] = "enable";
    this.setState({ open: true, fields: fields });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenEditModal = () => {
    this.setState({ openEdit: true });
  };

  onCloseEditModal = () => {
    this.setState({ openEdit: false });
  };

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    this.bindMenuGrid()
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

  bindMenuGrid() {
    axios
      .get(BASE_URL + "rouge/menu/get")
      .then((response) => {
        let menus = [];
        response.data.forEach(function (d) {
          if (d.type === 'menu') {
            menus.push(d)
          }
        })
        this.setState({
          gridData: response.data,
          menus: menus
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

  MenuForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { fields } = this.state
      let formData = {
        name: fields.name,
        type: fields.type,
        state: fields.state,
        parentid: fields.type === 'menu' ? "0" : fields.menu
      }

      const config = {
        headers: {
          "content-type": "application/json"
        }
      };
      axios.post(BASE_URL + `rouge/menu/create`, JSON.stringify(formData), config)
        .then(response => {
          alert(response.data.Message);
          if (response.status === 201) {
            let fields = {};
            // fields["Name"] = "";
            this.setState({ fields: fields });
            this.bindMenuGrid();
            this.onCloseModal();
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;

  }

  render() {
    const BASE_URL = '#'
    const { open, openEdit } = this.state;
    const styleBack = {
      backgroundColor: this.state.background,
      height: '60px'
    }
    const styleBack1 = {
      backgroundColor: this.state.background
    }
    const { gridData, menus } = this.state
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
                    <button className="btn btn-outline-light" onClick={this.MenuForm}>
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
                    <h3><span className="toppdng">Menu </span></h3>
                  </div>
                </div>
              </div>

              {/* <div className="col-md-12">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                      <form className="login100-form validate-form">
                        <div className="wrap-input100 validate-input">
                          <span className="label-input100"> Name</span>
                          <input className="input100" type="text" name="name" placeholder="name" value={this.state.fields.name || ''} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.name}</div>
                        <div className="validate-input m-t-20">
                          <div className="label-input100">Type</div>
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="type" value="menu" checked={this.state.fields.type === "menu"} onChange={this.handleChange} />
                              Menu
                            </label>
                          </div>
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="type" value="submenu" checked={this.state.fields.type === "submenu"} onChange={this.handleChange} />
                              Sub Menu
                           </label>
                          </div>
                        </div>
                        <div className="validate-input m-t-20" hidden={this.state.fields.type !== "submenu"}>
                          <div className="form-group">
                            <label for="" className="menumrgn">Menu</label>
                            <select className="form-control" name="menu" id="" onChange={this.handleChange}>
                              <option selected={this.state.fields.menu === undefined} value="" >-- Select --</option>
                              <option value="menu">Menu</option>
                              <option value="submenu">Sub Menu</option>
                            </select>
                          </div>
                        </div>
                        <div className="validate-input m-t-20">
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn paddingl0">
                              <input type="radio" name="state" value="enable" checked={this.state.fields.state === "enable"} onChange={this.handleChange} />
                              <span className="checkboxpd">Enabled</span>
                            </label>
                          </div>
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="state" value="disable" checked={this.state.fields.state === "disable"} onChange={this.handleChange} />
                              <span className="checkboxpd">Disabled</span>
                            </label>
                          </div>
                        </div>
                        <div className="clear"></div>
                        <div className="container-login100-form-btn m-t-20">
                          <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn" onClick={this.MenuForm}>
                              Submit
                           </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="col col-md-12">
                <div className="col col-md-12 innercontent">
                  <div className="condensed-grid">
                    <div>
                      <button type="button" className="btn btn-primary hidden-print" onClick={this.onOpenModal}> <i className="fa fa-plus-circle"></i> Add New</button>
                      <Modal open={open} onClose={this.onCloseModal}>
                        <h2 className="modelhdr">Add New</h2>
                        <div className="modelmenu">
                          <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                            <div className="wrap-input100 validate-input">
                              <span className="label-input100"> Name</span>
                              <input className="input100" type="text" name="name" placeholder="name" value={this.state.fields.name || ''} onChange={this.handleChange} />
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.name}</div>
                            <div className="validate-input m-t-20">
                              <div className="label-input100">Type:</div>
                              <div className="col col-md-6 floatl">
                                <label className="radio menumrgn">
                                  <input type="radio" name="type" value="menu" checked={this.state.fields.type === "menu"} onChange={this.handleChange} />
                                  Menu
                                 </label>
                              </div>
                              <div className="col col-md-6 floatl">
                                <label className="radio menumrgn">
                                  <input type="radio" name="type" value="submenu" checked={this.state.fields.type === "submenu"} onChange={this.handleChange} />
                                  Sub Menu
                                </label>
                              </div>
                            </div>
                            <div className="validate-input m-t-20" hidden={this.state.fields.type !== "submenu"}>
                              <div className="form-group">
                                <label for="" className="menumrgn">Menu:</label>
                                <select className="form-control" name="menu" id="" onChange={this.handleChange}>
                                  <option selected={this.state.fields.menu === undefined} value="" >-- Select --</option>
                                  {menus.length > 0 ? (
                                    menus.map((data, index) => {
                                      return (
                                        <option key={index} value={data._id}> {data.name}</option>
                                      );
                                    })
                                  ) : (
                                      null
                                    )}
                                </select>
                              </div>
                            </div>
                            <div className="validate-input m-t-20">
                              <div className="label-input100">State:</div>
                              <div className="col col-md-6 floatl">
                                <label className="radio menumrgn">
                                  <input type="radio" name="state" value="enable" checked={this.state.fields.state === "enable"} onChange={this.handleChange} />
                                  Enabled
                                 </label>
                              </div>
                              <div className="col col-md-6 floatl">
                                <label className="radio menumrgn">
                                  <input type="radio" name="state" value="disable" checked={this.state.fields.state === "disable"} onChange={this.handleChange} />
                                  Disabled
                                </label>
                              </div>
                            </div>

                            <div className="clear"></div>
                            <div className="container-login100-form-btn m-t-20">
                              <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" onClick={this.MenuForm}>
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>

                    {/* <button type="button" class="btn btn-primary hidden-print">
                      <i class="fa fa-plus-circle"></i> Add New
                        </button> */}
                  </div>
                  <Modal open={openEdit} onClose={this.onCloseEditModal}>
                    <h2 className="modelhdr">Edit</h2>
                    <div className="modelmenu">
                      <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                      </div>
                    </div>

                  </Modal>
                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">Name</div>
                      <div className="col gridbr">Type</div>
                      <div className="col gridbr">Parent</div>
                      <div className="col gridbr">State</div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    {gridData.length > 0 ? (
                      gridData.map((data, index) => {
                        return (
                          <div className="row gridwtbg" key={index}>
                            <div className="col-sm-3 gridbr">{data.name}</div>
                            <div className="col gridbr">{data.type}</div>
                            <div className="col gridbr">{gridData.find(d => d._id === data.parentid) === undefined ? '' : gridData.find(d => d._id === data.parentid).name || ''}</div>
                            <div className="col gridbr">{`${data.state}d`}</div>
                            <div className="col-sm-1 gridbr textcenter">
                              {/* <button type="button" className="hidden-print" onClick={this.onOpenEditModal}> <i className="fas fa-edit iconcolor"></i></button> */}
                              <i className="fas fa-edit iconcolor"></i>
                            </div>
                            <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                          </div>
                        );
                      })
                    ) : (
                        <p>No records found..</p>
                      )}
                    {/* <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">Name</div>
                      <div className="col gridbr">Type</div>
                      <div className="col gridbr">State</div>
                      <div className="col gridbr">Parent</div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    <div className="row gridwtbg">
                      <div className="col-sm-3 gridbr">Home</div>
                      <div className="col gridbr">menu</div>
                      <div className="col gridbr">enable</div>
                      <div className="col gridbr"></div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">About</div>
                      <div className="col gridbr">menu</div>
                      <div className="col gridbr">enable</div>
                      <div className="col gridbr">	</div>
                      <div className="col-sm-1 gridbr textcenter">
                        <button type="button" className="hidden-print" onClick={this.onOpenEditModal}> <i className="fas fa-edit iconcolor"></i></button>
                      </div>
                      <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
                    </div> */}
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

export default MenuScreen;
