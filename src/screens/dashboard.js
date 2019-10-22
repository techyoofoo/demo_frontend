import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
// import PageFooter from './footer';
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

class DashboardScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
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
    console.log('Background', this.state.background)
    return (
      <div>
        <div className="container-fluid">
          {/* <PageHeader headerColor={this.state.background}/> */}
          <div className="row Header" style={styleBack1}>
            <div className="col-md-2">
              <div className="logo" style={styleBack}> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-2 changepassword">
              <button className="btn btn-outline-light" onClick={this.submituserRegistrationForm}><Link to="/changepassword" className="btn btn-link"> Change Password  </Link></button>
              {/* <Link to="/changepassword" className="btn btn-link"> Change Password  </Link> */}
            </div>
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
          <Sidebarmenu sidebarCloseProp={this.state.sidebarClose} />
          <div className="row">
            <div id="main">
              <div className="sidebarhdr">
                <div className="navbar-header">
                  <a className="navbar-minimalize minimalize-styl-2 btn btn-primary navbaralign" onClick={this.SideNvaBaropenClick}>
                    <i className="fa fa-bars"></i> </a>
                </div>
                <h3><span className="toppdng">Dashboard </span></h3>
              </div>
              <div className="col-md-12 innercontent">

                <div className="">
                  <div className="row cardpdng1">
                    <div className="col-md-4">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header cardheaderbg">
                          Update & Breaking News
                                    </div>
                        <ul className="list-group list-group-flush boxscroll">
                          <li className="list-group-item cardsubhdr"><i className="fa fa-check sicon" aria-hidden="true"></i> Chalk Talk
                                            <div className="carddate">November 30, 2018</div>
                          </li>
                          <li className="list-group-item cardsubhdr"><i className="fa fa-check sicon" aria-hidden="true"></i> Weekly Designer Emails
                                            <div className="carddate">November 27, 2018</div>
                          </li>
                          <li className="list-group-item cardsubhdr"><i className="fa fa-check sicon" aria-hidden="true"></i> Weekly Product Update
                                            <div className="carddate">October 20, 2018</div>
                          </li>
                          <li className="list-group-item cardsubhdr"><i className="fa fa-check sicon" aria-hidden="true"></i> Welcome!
                                            <div className="carddate">June 28, 2018</div>
                          </li>
                        </ul>
                        <div className="viewall"><a href={BASE_URL}> View All Company News <i className="fa fa-chevron-right sicon" aria-hidden="true"></i></a></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header cardheaderbg">
                          Your Designer Dollars
                                    </div>

                        <div className="boxminh">
                          <div className="col-md-11 currentbg">
                            <div className="currenttext">Current Balance</div>
                            <div className="currentbl">$200.00 USD</div>
                          </div>
                          <div className="col-md-12">
                            <div className="hdr1">Expiring Within 2 Weeks</div>
                            <div className="boxborder">
                              <div className="float-left">Amount</div>
                              <div className="float-right">Expires</div>
                            </div>
                            <div className="total">0</div>
                          </div>
                        </div>

                        <div className="viewallbr"><a href={BASE_URL}>View Designer Dollars Details <i className="fa fa-chevron-right sicon" aria-hidden="true"></i></a></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-4 box-shadow boxminh">
                        <div className="card-header cardheaderbg">
                          Your Personal Stats
                                    </div>
                        <div className="font14">Current Period Estimated Title</div>
                        <div className="hdr2">Executive Couturier</div>
                        <ul className="list-group listgrpdng">
                          <li className="list-group-item d-flex justify-content-between align-items-center bluefont">
                            $740.01
    <span className="badge badge-pill gryfont">PV</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center bluefont">
                            $280,937.92
    <span className="badge badge-pill gryfont">TV</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center bluefont">
                            80
    <span className="badge badge-pill gryfont">PSQ</span>
                          </li>
                        </ul>
                        <div className="viewallbr"><a href={BASE_URL}><i className="fa fa-arrow-circle-right sicon" aria-hidden="true"></i> View Details</a></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header cardheaderbg">
                          Your Commissions
                        </div>

                        <table className="table table-striped tablecnt">
                          <thead>
                            <tr className="tablehdr">
                              <th scope="col">Period</th>
                              <th scope="col">Paid as Title</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="trhdr">
                              <td>December 2018</td>
                              <td>Master Couturier</td>
                              <td className="trhdrblue">$31,979.20</td>
                            </tr>
                            <tr className="trhdr">
                              <td>November 2018	</td>
                              <td>Thornton</td>
                              <td className="trhdrblue">$45,665.06</td>
                            </tr>
                            <tr className="trhdr">
                              <td>October 2018</td>
                              <td>Master Couturier</td>
                              <td className="trhdrblue">$53,643.57</td>
                            </tr>
                            <tr className="trhdr">
                              <td>September 2018</td>
                              <td>Thornton</td>
                              <td className="trhdrblue">$45,658.61</td>
                            </tr>
                            <tr className="trhdr">
                              <td>August 2018</td>
                              <td>Master Couturier</td>
                              <td className="trhdrblue">$28,492.30</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="viewallbr">

                          <Link to="/commissions" className="btn btn-link">
                            <i className="fa fa-arrow-circle-right sicon" aria-hidden="true"></i>
                            View Current Earnings
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header cardheaderbg">
                          Your Inventory Orders
                                                </div>

                        <table className="table table-sm tablecnt">

                          <tbody>
                            <tr>
                              <th scope="row"><i className="fa fa-shopping-cart cartgry" aria-hidden="true"></i></th>
                              <td className="trhdrblue">Accepted </td>
                              <td className="trgry">#341951</td>
                              <td><i className="fa fa-arrow-circle-right cartblue" aria-hidden="true"></i></td>
                            </tr>
                            <tr>
                              <th scope="row"><i className="fa fa-shopping-cart cartgry" aria-hidden="true"></i></th>
                              <td className="trhdrblue">Shipped</td>
                              <td className="trgry">#339699</td>
                              <td><i className="fa fa-arrow-circle-right cartblue" aria-hidden="true"></i></td>
                            </tr>
                            <tr>
                              <th scope="row"><i className="fa fa-shopping-cart cartgry" aria-hidden="true"></i></th>
                              <td className="trhdrblue">Shipped</td>
                              <td className="trgry">#339699</td>
                              <td><i className="fa fa-arrow-circle-right cartblue" aria-hidden="true"></i></td>
                            </tr>
                            <tr>
                              <th scope="row"><i className="fa fa-shopping-cart cartgry" aria-hidden="true"></i></th>
                              <td className="trhdrblue">Shipped</td>
                              <td className="trgry">#339699</td>
                              <td><i className="fa fa-arrow-circle-right cartblue" aria-hidden="true"></i></td>
                            </tr>
                            <tr>
                              <th scope="row"><i className="fa fa-shopping-cart cartgry" aria-hidden="true"></i></th>
                              <td className="trhdrblue">Shipped</td>
                              <td className="trgry">#339699</td>
                              <td><i className="fa fa-arrow-circle-right cartblue" aria-hidden="true"></i></td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="viewallbr"><a href={BASE_URL}><i className="fa fa-arrow-circle-right sicon" aria-hidden="true"></i> View All Orders</a></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header cardheaderbg">
                          Your Next Title Promotion
                                                </div>
                        <table className="table table-sm tablecnt">
                          <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-7 ">
                              <div className="Promotionbg rounded-circle">0<span className="per-font">%</span></div>
                            </div>
                          </div>
                        </table>
                        <div className="viewallbr"><a href={BASE_URL}><i className="fa fa-arrow-circle-right sicon" aria-hidden="true"></i> View Promotion Details</a></div>
                      </div>
                    </div>
                    <div className="col-md-4 btmmrgn">
                      <div className="card mb-4 box-shadow">
                        <div className="card-header cardheaderbg">
                          Your Team Activity
                                                </div>
                        <div className="col-md-12 ">
                          <div className="row boxul">
                            <div className="boxscroll">
                              <ul>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Lisa Butler has just placed an order.
                                                                <div className="orderno"> [338951] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Gloria Simmons has just placed an order
                                                                <div className="orderno">[338949] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Sharon Weaver has just placed an order.
                                                             <div className="orderno">[338945] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Danielle Barnes has just placed an order.
                                                             <div className="orderno">[338943] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Candace McBride has just placed an order.
                                                             <div className="orderno">[338941] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Melodie Colvin has just placed an order.
                                                             <div className="orderno">[338939] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Estephany Castellon has just placed an order.
                                                             <div className="orderno">[338938] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Amber Burkhart has just placed an order.
                                                             <div className="orderno">[338937] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Misty Markwell has just placed an order.
                                                             <div className="orderno">[338929] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Michael Loucks has just placed an order.
                                                             <div className="orderno">[338928] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Breanna Vincent has just placed an order.
                                                             <div className="orderno">[338923] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Ann Jean Gates has just placed an order.
                                                             <div className="orderno">[338922] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Alison Coleman has just placed an order.
                                                             <div className="orderno">[338914] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                                <li><i className="fa fa-angle-right arrowr" aria-hidden="true"></i> Melinda Flegel has just placed an order.
                                                             <div className="orderno">[338887] <span className="floatr orderdate">February 6, 2019</span></div>
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>

                        <div className="viewallbr"><a href={BASE_URL}><i className="fa fa-arrow-circle-right sicon" aria-hidden="true"></i> View All Recent Activity</a></div>
                      </div>
                    </div>
                    <div className="col-md-8 btmmrgn">
                      <div className="card mb-8 box-shadow">
                        <div className="card-header cardheaderbg">
                          Your Team Members
                                                </div>
                        <div className="col-md-12 boxscroll">
                          <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <a href={BASE_URL}><img src="../../assets/223.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" /></a>
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Kenneth Hess</h4>
                                    <div className="proid">#223</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <a href={BASE_URL}><img src="../../assets/390.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" /></a>
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Cheryl McCartney</h4>
                                    <div className="proid">#390</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <a href={BASE_URL}><img src="../../assets/441.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" /></a>
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Jessica Carpenter</h4>
                                    <div className="proid">#441</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/392.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Jessica Wilson</h4>
                                    <div className="proid">#392</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/441.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Linda Sadler</h4>
                                    <div className="proid">#403</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/441.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Sharon Fox</h4>
                                    <div className="proid">#511</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/475.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Sarah Paige-Gruber</h4>
                                    <div className="proid">#475</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/463.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Carol McLane</h4>
                                    <div className="proid">#463</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/523.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Regina Andari </h4>
                                    <div className="proid">#523</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/441.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Kimberly Maresch- Roberts</h4>
                                    <div className="proid">#557</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/441.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Narda Hirn</h4>
                                    <div className="proid">#611</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="well well-sm">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4">
                                    <img src="../../assets/441.png" alt="" className="img-rounded img-responsive rounded-circle profileimg" />
                                  </div>
                                  <div className="col-sm-6 col-md-8">
                                    <h4 className="profilehdr">Gail Hopkins</h4>
                                    <div className="proid">#497</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="viewallbr"><a href={BASE_URL}><i className="fa fa-arrow-circle-right sicon" aria-hidden="true"></i> View Newest Distributors</a></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <PageFooter footerColor={this.state.background} />
        </div>

      </div>
    )
  }
}

export default DashboardScreen;
