import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { SketchPicker } from 'react-color';
import PageHeader from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
import langdata from '../../src/locales/de/registertranslation';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings(langdata);
console.log(strings);
const selLang = localStorage.getItem('lang');
console.log("Saved lang", selLang)
strings.setLanguage(selLang);
console.log('strings', strings)

const gbHeaderColor = localStorage.getItem("headerColor");
export default class PageFooter extends Component {
  state = {
    popupVisible: false,
    show: false, background: '#296091'
  };
  
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
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
         <div className="row fixed-footer">
            <div className="col-md-12 Footer" onClick = {this.props.handler}>{strings.Copyright}</div>
          </div>
      </div>
    )
  }
}