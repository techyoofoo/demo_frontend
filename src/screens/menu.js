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
    };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
  MenuForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};

      fields["Name"] = "";

      this.setState({ fields: fields });
      alert("Form submitted");
    }

  }
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["Name"]) {
      formIsValid = false;
      errors["Name"] = "*Please enter your name.";
    }

    if (typeof fields["Name"] !== "undefined") {
      if (!fields["Name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["Name"] = "*Please enter alphabet characters only.";
      }
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

              <div className="col-md-12">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                      <form className="login100-form validate-form">
                        <div className="wrap-input100 validate-input">
                          <span className="label-input100"> Name</span>
                          <input className="input100" type="text" name="Name" placeholder="name" value={this.state.fields.Name} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.Name}</div>
                        <div className="validate-input m-t-20">
                          <div className="label-input100">Type</div>
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="answer" />
                              Menu
                          </label>
                          </div>
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="answer" checked />
                              Sub Menu
                           </label>
                          </div>
                        </div>
                        <div className="validate-input m-t-20">
                          <div className="form-group">
                            <label for="" className="menumrgn">Menu</label>
                            <select className="form-control" id="">
                              <option>-- Select --</option>
                              <option>Menu</option>
                              <option>Sub Menu</option>
                            </select>
                          </div>
                        </div>
                        <div className="validate-input m-t-20">
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn paddingl0">
                              <input type="checkbox" name="Menu" value="Menu" checked />
                              <span className="checkboxpd">Enabled</span>
                            </label>
                          </div>
                          <div className="col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="checkbox" name="Menu" value="Menu" />
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
              </div>

              <div className="col col-md-12">
                <div className="col col-md-12 innercontent">
                  <div class="condensed-grid">
                    <div>
                      <button type="button" class="btn btn-primary hidden-print" onClick={this.onOpenModal}> <i class="fa fa-plus-circle"></i> Add New</button>
                      <Modal open={open} onClose={this.onCloseModal}>
                        <h2 className="modelhdr">Menu List Grid</h2>
                        <div className="modelmenu">
                        <div className="p-l-55 p-r-55 p-t-25 p-b-25">
                        <div className="wrap-input100 validate-input">
                          <span className="label-input100"> Name</span>
                          <input className="input100" type="text" name="Name" placeholder="name" value={this.state.fields.Name} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="validate-input m-t-20">
                          <div className="form-group">
                            <label for="" className="menumrgn">Menu</label>
                            <select className="form-control" id="">
                              <option>-- Select --</option>
                              <option>Menu</option>
                              <option>Sub Menu</option>
                            </select>
                          </div>
                        </div>
                        <div className="validate-input m-t-20">
                          <div className="label-input100">Type</div>
                          <div className="col col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="answer" />
                              Menu
                          </label>
                          </div>
                          <div className="col col-md-6 floatl">
                            <label className="radio menumrgn">
                              <input type="radio" name="answer" checked />
                              Sub Menu
                           </label>
                          </div>
                        </div>
                        <div className="clear"></div>
                        <div className="container-login100-form-btn m-t-20">
                          <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn">
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
                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">Period</div>
                      <div className="col gridbr">Paid as Title</div>
                      <div className="col gridbr">PV</div>
                      <div className="col gridbr">TV</div>
                      <div className="col-sm-1 gridbr textcenter"><i class="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i class="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    <div className="row gridwtbg">
                      <div className="col-sm-3 gridbr">October 2019</div>
                      <div className="col gridbr">Designer</div>
                      <div className="col gridbr">0.00</div>
                      <div className="col gridbr">0.00</div>
                      <div className="col-sm-1 gridbr textcenter"><i class="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i class="fas fa-trash-alt iconcolor"></i></div>
                    </div>
                    <div className="row gridgraybg">
                      <div className="col-sm-3 gridbr">September 2019</div>
                      <div className="col gridbr">Designer</div>
                      <div className="col gridbr">58.74</div>
                      <div className="col gridbr">2,974.41	</div>
                      <div className="col-sm-1 gridbr textcenter"><i class="fas fa-edit iconcolor"></i></div>
                      <div className="col-sm-1 gridbr textcenter"><i class="fas fa-trash-alt iconcolor"></i></div>
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

export default MenuScreen;
