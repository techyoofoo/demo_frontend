import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from '../../screens/header';
import Sidebarmenu from '../../screens/sidebar';
// import '../App.css';
import '../../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class CommissionsScreen extends Component {
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
    const gridData = [{
      "BonusID": 6,
      "BonusDescription": "Coaching Bonus",
      "FromCustomerID": 58873,
      "FromCustomerName": "Georgiana dambra",
      "Level": 1,
      "PaidLevel": 2,
      "Percentage": 7,
      "OrderID": null,
      "SourceAmount": 126.45,
      "CommissionAmount": 8.8515
    },
    {
      "BonusID": 5,
      "BonusDescription": "Sponsoring Bonus",
      "FromCustomerID": 9151,
      "FromCustomerName": "Deann Kroll",
      "Level": 1,
      "PaidLevel": 3,
      "Percentage": 5,
      "OrderID": null,
      "SourceAmount": 185.82,
      "CommissionAmount": 9.291
    },
    {
      "BonusID": 6,
      "BonusDescription": "Coaching Bonus",
      "FromCustomerID": 9151,
      "FromCustomerName": "Deann Kroll",
      "Level": 1,
      "PaidLevel": 1,
      "Percentage": 10,
      "OrderID": null,
      "SourceAmount": 185.82,
      "CommissionAmount": 18.582
    }
    ]
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
                    <h3><span className="toppdng">commissions </span></h3>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="col-md-1"></div>
                <div className="col-md-10 innercontent">

                  {/* <div className="input-group searchbox">
                    <select className="custom-select" id="inputGroupSelect02">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <div className="input-group-append">
                      <label className="input-group-text" for="inputGroupSelect02">Options</label>
                    </div>
                  </div> */}

                  <div className="well well-sm searchbox">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="input-group">
                          <span className="input-group-btn">
                            <button id="gotopreviousperiod" className="btn btn-default" type="button">
                              <i className="fa fa-chevron-left"></i></button>
                          </span>
                          <select id="periodchoice" className="form-control">
                            <option value="/commissions/0/34">Current Commissions - Monthly 34 October 2019 (10/1/2019 - 10/31/2019)</option>
                            <option value="/commissions/0/33">Current Commissions - Monthly 33 September 2019 (9/1/2019 - 9/30/2019)</option>
                            <option value="/commissions/0/32">Current Commissions - Monthly 32 August 2019 (8/1/2019 - 8/31/2019)</option>
                            <option value="/commissions/427">Current Commissions - Monthly 31 July 2019 (7/1/2019 - 7/31/2019)</option>
                            <option value="/commissions/408">Current Commissions - Monthly 30 June 2019 (6/1/2019 - 6/30/2019)</option>
                            <option value="/commissions/378">Current Commissions - Monthly 29 May 2019 (5/1/2019 - 5/31/2019)</option>
                            <option value="/commissions/339">Current Commissions - Monthly 28 April 2019 (4/1/2019 - 4/30/2019)</option>
                            <option value="/commissions/318">Current Commissions - Monthly 27 March 2019 (3/1/2019 - 3/31/2019)</option>
                            <option value="/commissions/296">Current Commissions - Monthly 26 February 2019 (2/1/2019 - 2/28/2019)</option>
                            <option value="/commissions/279">Current Commissions - Monthly 25 January 2019 (1/1/2019 - 1/31/2019)</option>
                            <option value="/commissions/258">Current Commissions - Monthly 24 December 2018 (12/1/2018 - 12/31/2018)</option>
                            <option value="/commissions/232">Current Commissions - Monthly 23 November 2018 (11/1/2018 - 11/30/2018)</option>
                            <option value="/commissions/218">Current Commissions - Monthly 22 October 2018 (10/1/2018 - 10/31/2018)</option>
                            <option value="/commissions/199">Current Commissions - Monthly 21 September 2018 (9/1/2018 - 9/30/2018)</option>
                            <option value="/commissions/176">Current Commissions - Monthly 20 August 2018 (8/1/2018 - 8/31/2018)</option>
                            <option value="/commissions/156">Current Commissions - Monthly 19 July 2018 (7/1/2018 - 7/31/2018)</option>
                            <option value="/commissions/0/18">Current Commissions - Monthly 18 June 2018 (6/1/2018 - 6/30/2018)</option>
                            <option value="/commissions/0/17">Current Commissions - Monthly 17 May 2018 (5/1/2018 - 5/31/2018)</option>
                            <option value="/commissions/0/16">Current Commissions - Monthly 16 April 2018 (4/1/2018 - 4/30/2018)</option>
                            <option value="/commissions/0/15">Current Commissions - Monthly 15 March 2018 (3/1/2018 - 3/31/2018)</option>
                            <option value="/commissions/0/14">Current Commissions - Monthly 14 February 2018 (2/1/2018 - 2/28/2018)</option>
                            <option value="/commissions/0/13">Current Commissions - Monthly 13 January 2018 (1/1/2018 - 1/31/2018)</option>
                            <option value="/commissions/0/12">Current Commissions - Monthly 12 December 2017 (12/1/2017 - 12/31/2017)</option>
                            <option value="/commissions/0/11">Current Commissions - Monthly 11 November 2017 (11/1/2017 - 11/30/2017)</option>
                            <option value="/commissions/0/10">Current Commissions - Monthly 10 October 2017 (10/1/2017 - 10/31/2017)</option>
                            <option value="/commissions/0/9">Current Commissions - Monthly 9 September 2017 (9/1/2017 - 9/30/2017)</option>
                            <option value="/commissions/0/8">Current Commissions - Monthly 8 August 2017 (8/1/2017 - 8/31/2017)</option>
                          </select>
                          <span className="input-group-btn">
                            <button id="gotonextperiod" className="btn btn-default" type="button">
                              <i className="fa fa-chevron-right"></i></button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="panel panel-default">
                    <div className="panel-body">
                      <h4 className="header_m">Monthly 33 September 2019 Commissions</h4>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="metric metric-sm">
                            <dl className="dl-metric">
                              <dt id="teamLabel" ><strong>Team Commissions</strong></dt>
                              <dd id="teamID" >$0.00&nbsp;USD</dd>
                              <dt id="usdLabel" ><strong>USD Deferred Commissions</strong></dt>
                              <dd id="usdID" >$24.48&nbsp;USD</dd>
                              <dt id="cadLabel"><strong>CAD Deferred Commissions</strong></dt>
                              <dd id="cadID" >$0.00&nbsp;CAD</dd>
                              <dt id="savvyLabel" s><strong>Savvy Seller Bonus Total</strong></dt>
                              <dd id="savvyID" >&nbsp;</dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div className="row">
                            <div className="col-sm-6">
                              <dl className="dl-metric">
                                <dt>PV</dt>
                                <dd>58.74</dd>
                                <dt>TV</dt>
                                <dd>2,974.41</dd>
                                <dt>EV</dt>
                                <dd>4,889.21</dd>
                              </dl>
                            </div>
                            <div className="col-sm-6">
                              <dl className="dl-metric">
                                <dt>PSQ</dt>
                                <dd>1</dd>
                                <dt>Level 1 Mentors</dt>
                                <dd>0</dd>
                                <dt>Master Mentor Legs</dt>
                                <dd>0</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="metric metric-sm">
                            <div className="metric-title">
                              Qualifying as: <strong>Designer</strong>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="metric metric-sm">
                            <div className="metric-title">*Team Commissions are displayed in USD</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container gridcontent">
                    <div className="row gridgraybg">
                      <div className="gridbr gridno"></div>
                      <div className="col gridbr">From ID#</div>
                      <div className="col gridbr">From</div>
                      <div className="col gridbr">Paid Level</div>
                      <div className="col gridbr">Source</div>
                      <div className="col gridbr">%</div>
                      <div className="col gridbr">Earned</div>
                    </div>
                    <div className="row gridgraybg">
                      <div className="col-12 gridmdlhdr"><strong>Bonus: Deferred Commission</strong></div>
                    </div>                                       
                      {
                        gridData.map(dt => {
                          return (
                            <div className="row gridwtbg">
                              <div className="gridbr gridno"></div>
                              {/* <div className="col gridbr">{dt.BonusID}</div>
                              <div className="col gridbr">{dt.BonusDescription}</div> */}
                              <div className="col gridbr">{dt.FromCustomerID}</div>
                              <div className="col gridbr">{dt.FromCustomerName}</div>
                              {/* <div className="col gridbr">{dt.Level}</div> */}
                              <div className="col gridbr">{dt.PaidLevel}</div>
                              {/* 
                              <div className="col gridbr">{dt.OrderID}</div> */}
                              <div className="col gridbr">{dt.SourceAmount}</div>
                              <div className="col gridbr">{dt.Percentage}</div>
                              <div className="col gridbr">{dt.CommissionAmount}</div>
                            </div>)
                        })
                      }                   
                    <div className="row gridgraybg">
                      <div className="gridbr gridno"></div>
                      <div className="col gridbr"></div>
                      <div className="col gridbr"></div>
                      <div className="col gridbr"></div>
                      <div className="col gridbr"></div>
                      <div className="col gridbr"></div>
                      <div className="col gridbr"><strong>Total: $24.48 USD</strong></div>
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

export default CommissionsScreen;
