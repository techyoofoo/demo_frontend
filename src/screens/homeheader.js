import React, { Component } from 'react';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import langdata from '../../src/locales/de/registertranslation';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings(langdata);
console.log(strings);
const selLang = localStorage.getItem('lang');
console.log("Saved lang", selLang)
strings.setLanguage(selLang);
console.log('strings', strings)

export default class HomeHeaderscreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected : null,
    }
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }
  componentDidMount(){
    let selected =localStorage.getItem('lang');
    console.log('Selected **', selected);
    this.setState({ selected : selected });
  }
  handleLanguageChange(e) {
    debugger;
    e.preventDefault();
    let lang = e.target.value;
    localStorage.setItem('lang', lang);
    console.log('----Changed Language----', lang);
    // let fields = this.state.selected;
    // fields[lang] = lang;

    this.setState({ selected : lang });
    window.location.reload(false);
    // this.setState(prevState => ({
    //   language: lang
    // }))
  }
  render() {
    const BASE_URL = '#'
    console.log('-----render---lang', this.state.selected);
    return (
      <div>
        <div className="row fixed-header">
          <div className="col col-sm-6 col-md-2">
            <div className="logo"> <a href={BASE_URL}><img className="img-fluid logopdng" src="../images/logo.png" alt="logo"></img></a></div>
          </div>
          <div className="col col-sm-6 col-md-10 textalign">
            <div className="navlinks">
              <ul>
                <li>
                  <div>
                    <select class="browser-default custom-select" onChange={this.handleLanguageChange} value={this.state.selected}>
                      <option value="en">En- English</option>
                      <option value="de">de- German</option>
                      <option value="hi">hi- Hindi</option>
                    </select>
                  </div>
                </li>
                <li><a href="/#/login/">{strings.Login}</a></li>
                <li><a href="/#/register/">{strings.Registration}</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
}