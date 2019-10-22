import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class RankScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

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
  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};

      fields["FirstName"] = "";
      fields["UserName"] = "";
      fields["password"] = "";
      fields["address"] = "";
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

    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "*Please enter your address.";
    }

    if (typeof fields["address"] !== "undefined") {
      //regular expression for address validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["address"])) {
        formIsValid = false;
        errors["address"] = "*Please enter valid address.";
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
          <div className="row Header" style={styleBack1}>
            <div className="col-md-2">
              <div className="logo" style={styleBack}> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-1">
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
            </div>
            <div className="col-md-1 logouticon">
              <a href={BASE_URL}>
                <span className="glyphicon glyphicon-log-out"></span>
              </a>
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
                    <h3><span className="toppdng">Rank Advancement </span></h3>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="col-md-1"></div>
                <div className="col-md-12 innercontent">

                  <div className="row">
                    <div className="col-md-10">
                      <div class="well well-sm searchbox">
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="input-group">
                              <span class="input-group-btn">
                                <button id="gotopreviousrank" class="btn btn-default" type="button">
                                  <i className="fa fa-chevron-left"></i></button>
                              </span>
                              <select id="rankchoice" class="form-control">
                                <option value="0">
                                  No Rank
                                    </option>
                                <option value="1" selected="">
                                  Designer
                                    </option>
                                <option value="10">
                                  Qualified Designer
                                    </option>
                                <option value="20">
                                  Leading Designer
                                    </option>
                                <option value="30">
                                  Master Designer
                                    </option>
                                <option value="40">
                                  Mentor
                                    </option>
                                <option value="50">
                                  Leading Mentor
                                    </option>
                                <option value="60">
                                  Master Mentor
                                    </option>
                                <option value="70">
                                  Couturier
                                    </option>
                                <option value="80">
                                  Executive Couturier
                                    </option>
                                <option value="90">
                                  Master Couturier
                                    </option>
                              </select>
                              <span class="input-group-btn">
                                <button id="gotonextrank" class="btn btn-default" type="button">
                                  <i className="fa fa-chevron-right"></i></button>
                              </span>
                            </div>
                          </div>
                          <div class="col-sm-7">

                          </div>
                        </div>
                      </div>
                      <div class="panel panel-default mrgntop">
                        <div class="panel-body">
                          <h3 className="paneltitle">Qualified Designer</h3>
                          <div class="row">
                            <div class="col-sm-4">
                              <div class="metric metric-sm">
                                <div class="metric-body text-info">75%</div>
                                <div class="metric-title">
                                  Complete
                        </div>
                              </div>
                            </div>
                            <div class="col-sm-8">

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-10">
                      <div class="panel panel-default mrgntop">
                        <div class="panel-heading paneltitlebg">
                          <h4 class="panel-title">Qualification Requirements</h4>
                        </div>
                        <div class="list-group">
                          <div class="list-group-item">
                            <div class="media">
                              <div class="media-object pull-left text-success"><i class="fa fa-check" aria-hidden="true"></i></div>
                              <div class="media-body">
                                You must be a Designer.
            </div>
                            </div>
                          </div>
                          <div class="list-group-item">
                            <div class="media">
                              <div class="media-object pull-left text-success"><i class="fa fa-check" aria-hidden="true"></i></div>
                              <div class="media-body">
                                Your account must be in good standing.
            </div>
                            </div>
                          </div>
                          <div class="list-group-item">
                            <div class="media">
                              <div class="media-object pull-left text-danger"><i class="fa fa-times" aria-hidden="true"></i></div>
                              <div class="media-body">
                                You need at least 100 Personal Volume (PV).
                
                    <div class="space-10"></div>
                                <div class="progress progress-sm no-margin">
                                  <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <span class="sr-only">0% Complete</span>
                                  </div>
                                </div>
                                <small class="text-muted">0 of 100</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
          <PageFooter footerColor={this.state.background} />
        </div>

      </div >
    )
  }
}

export default RankScreen;
