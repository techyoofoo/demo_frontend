import React, { Component } from "react";
import { Button, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalizedStrings from "react-localization";
import langdata from "../../src/locales/de/sidebartranslation";

let strings = new LocalizedStrings(langdata);
const selLang = localStorage.getItem("lang");
strings.setLanguage(selLang);

export default class Sidebarmenu extends Component {
  state = {
    userType: "Admin"
  };
  componentDidMount() {
    const getUserType = localStorage.getItem("userType");
    this.setState({ userType: getUserType });
  }

  // componentDidMount() {
  //     document.getElementById("mySidenav").style.width = "200px";
  //     document.getElementById("main").style.marginLeft = "200px";
  //   }
  //   SideNavBarcloseClick = () =>{
  //     document.getElementById("mySidenav").style.width = "0";
  //     document.getElementById("main").style.marginLeft= "0";
  //   }
  //   SideNvaBaropenClick = () =>{
  //     document.getElementById("mySidenav").style.width = "200px";
  //     document.getElementById("main").style.marginLeft = "200px";
  //   }

  render() {
    const BASE_URL = "#";
    console.log("Props", this.props.sidebarCloseProp);
    return (
      <div>
        <div className="col-sm-2 leftmenu" id="mySidenav" className="sidenav">
          <div>
            <Accordion defaultActiveKey="0">
              {this.state.userType === "Admin" ? (
                <div>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      {strings.Plugins}
                      <i
                        className="fa fa-angle-down dwnarrow"
                        aria-hidden="true"
                      ></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="leftnavlinks">
                          <ul>
                            <li>
                              <i
                                className="fa fa-caret-right rightarrow"
                                aria-hidden="true"
                              ></i>
                              <Link to="/install">{strings.Install}</Link>
                            </li>
                            <li>
                              <i
                                className="fa fa-caret-right rightarrow"
                                aria-hidden="true"
                              ></i>
                              <Link to="/uninstall"> {strings.Uninstall} </Link>
                            </li>
                          </ul>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      {strings.Admin}
                      <i
                        className="fa fa-angle-down dwnarrow"
                        aria-hidden="true"
                      ></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <div className="leftnavlinks">
                          <ul>
                            <input type="hidden" id="2" />
                            <li>
                              <Link to="/menu">
                                <i
                                  className="fa fa-caret-right rightarrow"
                                  aria-hidden="true"
                                ></i>
                                {strings.Menu}
                              </Link>
                            </li>
                            <li>
                              <Link to="/user">
                                <i
                                  className="fa fa-caret-right rightarrow"
                                  aria-hidden="true"
                                ></i>
                                {strings.User}
                              </Link>
                            </li>
                            <li>
                              <Link to="/usergroups">
                                <i
                                  className="fa fa-caret-right rightarrow"
                                  aria-hidden="true"
                                ></i>
                                {strings.UserGroups}
                              </Link>
                            </li>
                            <li>
                              <Link to="/role">
                                <i
                                  className="fa fa-caret-right rightarrow"
                                  aria-hidden="true"
                                ></i>
                                {strings.Role}
                              </Link>
                            </li>
                            <li>
                              <Link to="/rolepermission">
                                <i
                                  className="fa fa-caret-right rightarrow"
                                  aria-hidden="true"
                                ></i>
                                {strings.RolePermission}
                              </Link>
                            </li>
                            {/* <li><Link to="/submenu"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Sub Menu</Link></li> */}
                          </ul>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </div>
              ) : (
                ""
              )}
              {/* <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Commissions <i className="fa fa-angle-down dwnarrow" aria-hidden="true"></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div className="leftnavlinks">
                      <ul>
                        <input type="hidden" id="1" />
                        <li><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> <Link to="/commissions">COMMISSIONS</Link></li>
                        <li><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> <Link to="/rank">RANK ADVANCEMENT</Link> </li>
                        <li><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> <Link to="/volumes">VOLUMES</Link></li>
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card> */}

              {/* <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Users<i className="fa fa-angle-down dwnarrow" aria-hidden="true"></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <div className="leftnavlinks">
                      <ul>
                        <input type="hidden" id="3" />
                        <li><Link to="/user"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> User</Link></li>
                        <li><Link to="/usergroups"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> User Groups</Link></li>
                        <li><Link to="/role"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Role</Link></li>
                        <li><Link to="/roleaccess"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Role Access </Link></li>
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card> */}

              
            



















</Accordion>
          </div>
        </div>
      </div>
    );
  }
}
