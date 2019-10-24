import React, { Component } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Sidebarmenu  extends Component{

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
    
    render(){
        const BASE_URL = '#'
        console.log('Props', this.props.sidebarCloseProp)
        return(
            <div>
                <div className="col-sm-2 leftmenu" id="mySidenav" className="sidenav">
                <div>                   
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Plugins <i className="fa fa-angle-down dwnarrow" aria-hidden="true"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="leftnavlinks">
                          <ul>
                            <li><a><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> <Link to="/install">Install</Link></a></li>
                            <li><a><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> <Link to="/uninstall"> Uninstall </Link></a></li>
                          </ul>
                        </div>
                      </Card.Body>

                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Commissions <i className="fa fa-angle-down dwnarrow" aria-hidden="true"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div className="leftnavlinks">
                          <ul>
                            <li><a href="/#/commissions/"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> COMMISSIONS</a></li>
                            <li><a href="/#/rank/"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> RANK ADVANCEMENT</a></li>
                            <li><a href="/#/volumes/"><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> VOLUMES</a></li>
                          </ul>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      Column 2 <i className="fa fa-angle-down dwnarrow" aria-hidden="true"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <div className="leftnavlinks">
                          <ul>
                            <li><a href={BASE_URL}><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Column 1</a></li>
                            <li><a href={BASE_URL}><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Column 2</a></li>
                          </ul>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      Column 3 <i className="fa fa-angle-down dwnarrow" aria-hidden="true"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        <div className="leftnavlinks">
                          <ul>
                            <li><a href={BASE_URL}><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Column 1</a></li>
                            <li><a href={BASE_URL}><i className="fa fa-caret-right rightarrow" aria-hidden="true"></i> Column 2</a></li>
                          </ul>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </div>
              </div>
            </div>
        )
    }
}