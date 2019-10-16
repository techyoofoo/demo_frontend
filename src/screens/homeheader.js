import React, { Component } from 'react';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


export default class HomeHeaderscreen extends Component {

  render() {
    const BASE_URL = '#'
    return (
      <div>
        <div className="row Header">
          <div className="col-md-2">
            <div className="logo"> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2 texyalign">
            <ReactFlagsSelect
              countries={["US", "GB", "FR", "DE", "IT"]}
              customLabels={{ "US": "EN-US", "GB": "EN-GB", "FR": "FR", "DE": "DE", "IT": "IT" }}
              placeholder="Select Language" />
          </div>
          <div className="col-md-2">
            <div className="navlinks">
              <ul>
                <li><a href="/#/login/">Login</a></li>
                <li><a href="/#/register/">Register</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}