import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from '../../screens/header';
import Sidebarmenu from '../../screens/sidebar';
import '../../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class GridPluginScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

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
                    <button className="btn btn-outline-light" onClick={this.submituserRegistrationForm}>
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
                    <h3><span className="toppdng"> Grid Plugin </span></h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 charthdr"> Grid View </div>
              </div>
              <div className="container gridcontent m-t-10">
                <div className="row gridbluebg">
                  <div className="col-sm-3 gridbr">Name</div>
                  <div className="col gridbr">Type</div>
                  <div className="col gridbr">State</div>
                  <div className="col gridbr">Parent</div>
                  <div className="col-sm-1 gridbr textcenter">Edit</div>
                  <div className="col-sm-1 gridbr textcenter">Delete</div>
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
                  <div className="col gridbr"></div>
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
                  <div className="col gridbr"></div>
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
                  <div className="col gridbr"></div>
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
                  <div className="col gridbr"></div>
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
                  <div className="col gridbr"></div>
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
                  <div className="col gridbr"></div>
                  <div className="col-sm-1 gridbr textcenter"><i className="fas fa-edit iconcolor"></i></div>
                  <div className="col-sm-1 gridbr textcenter"><i className="fas fa-trash-alt iconcolor"></i></div>
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

export default GridPluginScreen;
