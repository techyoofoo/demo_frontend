import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import socketIOClient from "socket.io-client";
const BASE_URL = `http://localhost:6002/`;


class CommissionsScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    this.handleSelectedChange = this.handleSelectedChange.bind(this);


    this.state = {
      popupVisible: false,
      show: false, 
      background: '#296091',
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      periodList: [],
      isLoadingPeriodList: true,
      selectedPeriod: "",
      HistoricalCommission: {},
      SummaryCommissions: {},
      RealTimeCommissions: {},
      HistoricalBonusDetails: {},
      Total: '',
      CadSum: '',
      UsdSum: '',
      TeamSum: '',
      SavvySum: '',
      Volumes: {},
      RealTimeCommissionDetails: {},
      RealTimeCommissions: []
    };
  }

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    const socket = socketIOClient("http://localhost:4001");
    socket.on("commission", data => this.setState({
      periodList: data.messages[0],
      isLoadingPeriodList: false
    }));
    this.bindCommissionDropdown();
    // const socket = socketIOClient("http://localhost:4001");
    // socket.on("commission", data => this.setState({
    //   periodList: data.messages[0],
    //   isLoadingPeriodList: false
    // }));
    // socket.on('commission', function (data) {
    //   console.log(data);
    //   this.setState({
    //     periodList: [],
    //     isLoadingPeriodList: false
    //   })
    // });
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

  bindCommissionDropdown() {
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };

    axios
      .post("http://localhost:7002/readfocus", config)
      .then((response) => {
        console.log(response.data)
      })
      .catch(error => this.setState({ error, isLoadingPeriodList: false }));


    // axios
    //   .get(BASE_URL + "periodlist/967")
    //   .then((response) => {
    //     this.setState({
    //       periodList: response.data.DropDownData,
    //       isLoadingPeriodList: false
    //     });
    //   })
    //   .catch(error => this.setState({ error, isLoadingPeriodList: false }));
  }

  handleSelectedChange(e) {
    const val = e.target.value;
    if (!val) {
      return
    }
    const periodId = val.split('-')[0];
    const runId = val.split('-')[1];
    const url = Number(runId) > 0 ? BASE_URL + `commissiondetails/967/${runId}/0` : BASE_URL + `commissiondetails/967/0/${periodId}`
    this.setState({ selectedPeriod: val });

    axios
      .get(url)
      .then((response) => {
        var amount = 0, usdSum = 0, cadSum = 0, teamSum = 0, savvySum = 0;
        var totalVal = '', cadSumVal = '', usdSumVal = '', teamSumVal = '', savvySumVal = '';
        var historicalBonusDetails = response.data.HistoricalBonusDetails;
        var allHistoricalBonusDetails = [];
        if (JSON.stringify(historicalBonusDetails) !== '{}') {
          allHistoricalBonusDetails = historicalBonusDetails.DeferredCommission.concat(historicalBonusDetails.SponsorBonus, historicalBonusDetails.CoachingBonus, historicalBonusDetails.CuturierBonus)
        }
        var realTimeCommissionDetails = response.data.RealTimeCommissionDetails;
        var allRealTimeCommissionDetails = [];
        if (JSON.stringify(realTimeCommissionDetails) !== '{}') {
          var rtGrid = {
            DeferredCommission: realTimeCommissionDetails.DeferredCommission.filter((data, idx) => idx < 2),
            SponsorBonus: realTimeCommissionDetails.SponsorBonus.filter((data, idx) => idx < 2),
            CoachingBonus: realTimeCommissionDetails.CoachingBonus.filter((data, idx) => idx < 2),
            CuturierBonus: realTimeCommissionDetails.CuturierBonus.filter((data, idx) => idx < 2),
          }
          realTimeCommissionDetails = rtGrid;
          allRealTimeCommissionDetails = realTimeCommissionDetails.DeferredCommission.concat(realTimeCommissionDetails.SponsorBonus, realTimeCommissionDetails.CoachingBonus, realTimeCommissionDetails.CuturierBonus)
        }

        if (allHistoricalBonusDetails.length > 0) {

          allHistoricalBonusDetails.forEach(function (bonus) {
            amount += Number(bonus.CommissionAmount);
            if (bonus.BonusID == 1) {
              if (true) {
                cadSum += Number(bonus.CommissionAmount);
              }
              else {
                usdSum += Number(bonus.CommissionAmount);
              }
            }
            else if (bonus.BonusID == 4) {
              savvySum += Number(bonus.CommissionAmount);
            }
            else {
              teamSum += Number(bonus.CommissionAmount);
            }
          });

          amount = amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
          usdSum = usdSum.toLocaleString(undefined, { maximumFractionDigits: 2 });
          cadSum = cadSum.toLocaleString(undefined, { maximumFractionDigits: 2 });
          teamSum = teamSum.toLocaleString(undefined, { maximumFractionDigits: 2 });
          savvySum = savvySum.toLocaleString(undefined, { maximumFractionDigits: 2 });

          if (amount + .01 >= (cadSum + usdSum) && amount - .01 <= (cadSum + usdSum)) {
            if (cadSum > 0 && usdSum > 0) {
              cadSumVal = "$" + cadSum + " CAD";
              usdSumVal = "$" + usdSum + " USD";
              totalVal = "$" + cadSum + " CAD $" + usdSum + " USD";
            }
            else if (cadSum > 0) {
              cadSumVal = `$` + cadSum + ` CAD`;
              totalVal = `$` + cadSum + ` CAD`;
            }
            else {
              cadSumVal = "$" + cadSum + " CAD";
              usdSumVal = "$" + usdSum + " USD";
              totalVal = "$" + usdSum + " USD";
            }
          }
          else {
            totalVal = "$" + amount + " USD";
          }
          teamSumVal = "$" + teamSum + " USD";
          if (savvySum > 0) {
            savvySumVal = "$" + savvySum + " USD";
          }
        }
        else if (allRealTimeCommissionDetails.length > 0) {

          allRealTimeCommissionDetails.forEach(function (bonus) {
            amount += Number(bonus.CommissionAmount);
            if (bonus.BonusID == 1) {
              if (true) {
                cadSum += Number(bonus.CommissionAmount);
              }
              else {
                usdSum += Number(bonus.CommissionAmount);
              }
            }
            else if (bonus.BonusID == 4) {
              savvySum += Number(bonus.CommissionAmount);
            }
            else {
              teamSum += Number(bonus.CommissionAmount);
            }
          });

          amount = amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
          usdSum = usdSum.toLocaleString(undefined, { maximumFractionDigits: 2 });
          cadSum = cadSum.toLocaleString(undefined, { maximumFractionDigits: 2 });
          teamSum = teamSum.toLocaleString(undefined, { maximumFractionDigits: 2 });
          savvySum = savvySum.toLocaleString(undefined, { maximumFractionDigits: 2 });

          if (amount + .01 >= (cadSum + usdSum) && amount - .01 <= (cadSum + usdSum)) {
            if (cadSum > 0 && usdSum > 0) {
              cadSumVal = "$" + cadSum + " CAD";
              usdSumVal = "$" + usdSum + " USD";
              totalVal = "$" + cadSum + " CAD $" + usdSum + " USD";
            }
            else if (cadSum > 0) {
              cadSumVal = `$` + cadSum + ` CAD`;
              totalVal = `$` + cadSum + ` CAD`;
            }
            else {
              cadSumVal = "$" + cadSum + " CAD";
              usdSumVal = "$" + usdSum + " USD";
              totalVal = "$" + usdSum + " USD";
            }
          }
          else {
            totalVal = "$" + amount + " USD";
          }
          teamSumVal = "$" + teamSum + " USD";
          if (savvySum > 0) {
            savvySumVal = "$" + savvySum + " USD";
          }
        }


        this.setState({
          HistoricalCommission: response.data.HistoricalCommission,
          SummaryCommissions: response.data.SummaryCommissions,
          HistoricalBonusDetails: historicalBonusDetails,
          RealTimeCommissionDetails: realTimeCommissionDetails,
          Total: totalVal,
          CadSum: cadSumVal,
          UsdSum: usdSumVal,
          TeamSum: teamSumVal,
          SavvySum: savvySumVal,
          Volumes: response.data.Volumes,
          RealTimeCommissions: response.data.RealTimeCommissions
        });
      })
      .catch(error => this.setState({ error }));

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

    const { isLoadingPeriodList, periodList } = this.state
    const { HistoricalBonusDetails, Volumes, SummaryCommissions, RealTimeCommissions, RealTimeCommissionDetails, HistoricalCommission, Total,
      SavvySum, CadSum, UsdSum, TeamSum } = this.state

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
                          <select value={this.state.selectedPeriod} onChange={this.handleSelectedChange} id="periodchoice" className="form-control">
                            {!isLoadingPeriodList ? (
                              periodList.map((data, index) => {
                                return (
                                  <option key={index} value={data.Period.PeriodID + "-" + data.RunID}> {"Current Commissions - " + data.Period.PeriodDescription} {"(" + data.Period.StartDate.split('T')[0] + " - " + data.Period.EndDate.split('T')[0] + ")"}</option>
                                );
                              })
                            ) : (
                                <option value=""></option>
                              )}
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
                      {!(JSON.stringify(HistoricalCommission) === JSON.stringify({})) ? (
                        <div>
                          <h4 className="header_m">{HistoricalCommission.PeriodDescription} Commissions</h4>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="metric metric-sm">
                                <dl className="dl-metric">
                                  {TeamSum !== '' ? <div><dt id="teamLabel"><strong>Team Commissions</strong></dt>
                                    <dd id="teamID" >{TeamSum}</dd></div> : null}
                                  {UsdSum !== '' ? <div>   <dt id="usdLabel" ><strong>USD Deferred Commissions</strong></dt>
                                    <dd id="usdID" >{UsdSum}</dd></div> : null}
                                  {CadSum !== '' ? <div><dt id="cadLabel" ><strong>CAD Deferred Commissions</strong></dt>
                                    <dd id="cadID" >{CadSum}</dd></div> : null}
                                  {SavvySum !== '' ? <div> <dt id="savvyLabel" ><strong>Savvy Seller Bonus Total</strong></dt>
                                    <dd id="savvyID" >{SavvySum}</dd></div> : null}
                                </dl>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-sm-6">
                                  <dl className="dl-metric">
                                    <dt>PV</dt>
                                    <dd>{Volumes.Volume2.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                    <dt>TV</dt>
                                    <dd>{Volumes.Volume5.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                    <dt>EV</dt>
                                    <dd>{Volumes.Volume6.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                  </dl>
                                </div>
                                <div className="col-sm-6">
                                  <dl className="dl-metric">
                                    <dt>PSQ</dt>
                                    <dd>{Volumes.Volume7}</dd>
                                    <dt>Level 1 Mentors</dt>
                                    <dd>{Volumes.Volume8}</dd>
                                    <dt>Master Mentor Legs</dt>
                                    <dd>{Volumes.Volume9}</dd>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="metric metric-sm">
                                <div className="metric-title">
                                  Qualifying as: <strong>{HistoricalCommission.RankDescription}</strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div style={{ height: "20px", float: "right", paddingRight: "15px" }}>
                                <div className="metric metric-sm">
                                  <div className="metric-title">*Team Commissions are displayed in USD</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                          <div></div>
                        )}


                      {(RealTimeCommissions.length > 0) ? (
                        <div>
                          <h4 className="header_m">{RealTimeCommissions[0].Commission.PeriodDescription} Commissions</h4>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="metric metric-sm">
                                <dl className="dl-metric">
                                  {TeamSum !== '' ? <div><dt id="teamLabel"><strong>Team Commissions</strong></dt>
                                    <dd id="teamID" >{TeamSum}</dd></div> : null}
                                  {UsdSum !== '' ? <div>   <dt id="usdLabel" ><strong>USD Deferred Commissions</strong></dt>
                                    <dd id="usdID" >{UsdSum}</dd></div> : null}
                                  {CadSum !== '' ? <div><dt id="cadLabel" ><strong>CAD Deferred Commissions</strong></dt>
                                    <dd id="cadID" >{CadSum}</dd></div> : null}
                                  {SavvySum !== '' ? <div> <dt id="savvyLabel" ><strong>Savvy Seller Bonus Total</strong></dt>
                                    <dd id="savvyID" >{SavvySum}</dd></div> : null}
                                </dl>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-sm-6">
                                  <dl className="dl-metric">
                                    <dt>PV</dt>
                                    <dd>{RealTimeCommissions[0].Volume.Volume2.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                    <dt>TV</dt>
                                    <dd>{RealTimeCommissions[0].Volume.Volume5.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                    <dt>EV</dt>
                                    <dd>{RealTimeCommissions[0].Volume.Volume6.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                  </dl>
                                </div>
                                <div className="col-sm-6">
                                  <dl className="dl-metric">
                                    <dt>PSQ</dt>
                                    <dd>{RealTimeCommissions[0].Volume.Volume7}</dd>
                                    <dt>Level 1 Mentors</dt>
                                    <dd>{RealTimeCommissions[0].Volume.Volume8}</dd>
                                    <dt>Master Mentor Legs</dt>
                                    <dd>{RealTimeCommissions[0].Volume.Volume9}</dd>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="metric metric-sm">
                                <div className="metric-title">
                                  Qualifying as: <strong>{RealTimeCommissions[0].Volume.RankDescription[0]}</strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div style={{ height: "20px", float: "right", paddingRight: "15px" }}>
                                <div className="metric metric-sm">
                                  <div className="metric-title">*Team Commissions are displayed in USD</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                          <div></div>
                        )}



                      {!(JSON.stringify(SummaryCommissions) === JSON.stringify({})) ? (
                        <div>
                          <h4 className="header_m">{SummaryCommissions.PeriodDescription} Commissions</h4>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="metric metric-sm">
                                <div className="metric-body text-info">
                                  ${SummaryCommissions.Commission.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span style={{ fontSize: "15px" }}>USD</span>
                                </div>
                                <div className="metric-title">
                                  QualifiedAs: <strong>{SummaryCommissions.PaidAsTitle}</strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-sm-6">
                                  <dl className="dl-metric">
                                    <dt>PV</dt>
                                    <dd>{SummaryCommissions.PV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                    <dt>TV</dt>
                                    <dd>{SummaryCommissions.TV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                    <dt>EV</dt>
                                    <dd>{SummaryCommissions.EV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd>
                                  </dl>
                                </div>
                                <div className="col-sm-6">
                                  <dl className="dl-metric">
                                    <dt>PSQ</dt>
                                    <dd>{SummaryCommissions.PSQ}</dd>
                                    <dt>Level 1 Mentors</dt>
                                    <dd>{SummaryCommissions.L1M}</dd>
                                    <dt>Master Mentor Legs</dt>
                                    <dd>{SummaryCommissions.MML}</dd>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                          <div></div>
                        )}
                    </div>
                  </div>

                  {(JSON.stringify(HistoricalBonusDetails) !== '{}') ?
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
                      {(HistoricalBonusDetails.DeferredCommission.length > 0) ?
                        <div>
                          <div className="row gridgraybg">
                            <div className="col-12 gridmdlhdr"><strong>Bonus: Deferred Commission</strong></div>
                          </div>
                          {
                            HistoricalBonusDetails.DeferredCommission.map(dt => {
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
                        </div>
                        : null}

                      {HistoricalBonusDetails.SponsorBonus.length > 0 ?
                        <div>
                          <div className="row gridgraybg">
                            <div className="col-12 gridmdlhdr"><strong>Bonus: Sponsor Bonus</strong></div>
                          </div>
                          {
                            HistoricalBonusDetails.SponsorBonus.map(dt => {
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
                        </div> : null}

                      {HistoricalBonusDetails.CoachingBonus.length > 0 ?
                        <div>
                          <div className="row gridgraybg">
                            <div className="col-12 gridmdlhdr"><strong>Bonus: Coaching Bonus</strong></div>
                          </div>
                          {
                            HistoricalBonusDetails.CoachingBonus.map(dt => {
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
                        </div> : null}


                      {HistoricalBonusDetails.CuturierBonus.length > 0 ? <div>
                        <div className="row gridgraybg">
                          <div className="col-12 gridmdlhdr"><strong>Bonus: Cuturier Bonus</strong></div>
                        </div>
                        {
                          HistoricalBonusDetails.CuturierBonus.map(dt => {
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
                      </div> : null}

                      <div className="row gridgraybg">
                        <div className="gridbr gridno"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"><strong style={{ fontSize: "12px" }}>Total: {Total}</strong></div>
                      </div>
                    </div>
                    : null}


                  {(JSON.stringify(RealTimeCommissionDetails) !== '{}') ?
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
                      {(RealTimeCommissionDetails.DeferredCommission.length > 0) ?
                        <div>
                          <div className="row gridgraybg">
                            <div className="col-12 gridmdlhdr"><strong>Bonus: Deferred Commission</strong></div>
                          </div>
                          {
                            RealTimeCommissionDetails.DeferredCommission.map(dt => {
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
                        </div>
                        : null}

                      {RealTimeCommissionDetails.SponsorBonus.length > 0 ?
                        <div>
                          <div className="row gridgraybg">
                            <div className="col-12 gridmdlhdr"><strong>Bonus: Sponsor Bonus</strong></div>
                          </div>
                          {
                            RealTimeCommissionDetails.SponsorBonus.map(dt => {
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
                        </div> : null}

                      {RealTimeCommissionDetails.CoachingBonus.length > 0 ?
                        <div>
                          <div className="row gridgraybg">
                            <div className="col-12 gridmdlhdr"><strong>Bonus: Coaching Bonus</strong></div>
                          </div>
                          {
                            RealTimeCommissionDetails.CoachingBonus.map(dt => {
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
                        </div> : null}


                      {RealTimeCommissionDetails.CuturierBonus.length > 0 ? <div>
                        <div className="row gridgraybg">
                          <div className="col-12 gridmdlhdr"><strong>Bonus: Cuturier Bonus</strong></div>
                        </div>
                        {
                          RealTimeCommissionDetails.CuturierBonus.map(dt => {
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
                      </div> : null}

                      <div className="row gridgraybg">
                        <div className="gridbr gridno"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"></div>
                        <div className="col gridbr"><strong style={{ fontSize: "12px" }}>Total: {Total}</strong></div>
                      </div>
                    </div>
                    : null}

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
