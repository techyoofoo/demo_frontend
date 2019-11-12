import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { SketchPicker } from 'react-color';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import '../styles/styles.css';
import langdata from '../../src/locales/de/dashboardtranslation';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings(langdata);
const selLang = localStorage.getItem('lang');
strings.setLanguage(selLang);

const gbHeaderColor = localStorage.getItem("headerColor");
export class PageHeader extends Component {
  state = {
    popupVisible: false,
    show: false, background: '#296091'
  };
  constructor(props){
    super(props);

    this.state = {
      selected : null,
    }
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };
  handleLanguageChange(e) {
    debugger;
    e.preventDefault();
    let lang = e.target.value;
    localStorage.setItem('lang', lang);
    this.setState({ selected : lang });
    window.location.reload(false);
  };
  componentDidMount(){
    let selected =localStorage.getItem('lang');
    this.setState({ selected : selected });
  }
  handleClick = () => {
    if (!this.state.popupVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));
  };

  handleOutsideClick = e => {
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
    console.log('headerColor----', this.state.background);
    localStorage.setItem("headerColor", this.state.background);
    // gbHeaderColor = this.state.background;
    return (
      <div>

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
                <select class="browser-default custom-select languagepdng" onChange={this.handleLanguageChange} value={this.state.selected}>
                      <option value="en">En- English</option>
                      <option value="de">de- German</option>
                      <option value="hi">hi- Hindi</option>
                    </select>
                </li>
                <li>
                  <button className="btn btn-outline-light" onClick={this.submituserRegistrationForm}>
                    <Link to="/changepassword" className="btn btn-link"> {strings.ChangePassword}  </Link></button>
                </li>
                <li>
                  <div className="popover-container"
                    ref={node => {
                      this.node = node;
                    }}
                  >
                    <button className="btn btn-outline-light" onClick={this.handleClick}>{strings.ChangeColorTheme}</button>
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


        {/* <div className="row fixed-header" style={styleBack1}>
        <div className="innerdv">
          <div className="col-md-2">
            <div className="logo" style={styleBack}> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2">
            <ReactFlagsSelect
              countries={["US", "GB", "FR", "DE", "IT"]}
              customLabels={{ "US": "EN-US", "GB": "EN-GB", "FR": "FR", "DE": "DE", "IT": "IT" }}
              placeholder="Select Language" />
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
        </div> */}
      </div>
    )
  }
}

export class PageFooter extends Component {

  render() {

    console.log('footer', this.props.footerColor)
    const footerBackgroundColor = {
      backgroundColor: this.props.footerColor
    }
    return (
      <div>
       <div className="row fixed-footer">
            <div className="col-md-12 Footer" onClick = {this.props.handler}>{strings.Copyright}</div>
          </div>
      </div>
    )
  }
}