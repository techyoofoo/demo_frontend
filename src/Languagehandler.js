import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
//import langdata from '../src/lang'
import langdata from '../src/locales/de/logintranslation';
let strings = new LocalizedStrings(langdata);
export default class Languagehandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
          language: 'de'
        }
    
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
      }

      handleLanguageChange(e) {
        e.preventDefault();
        let lang = e.target.value;
        this.setState(prevState => ({
          language: lang
        }))
    }
    render(){
        console.log('---------', this.props.lang)
        strings.setLanguage(this.props.lang);
        return(
            <div>
                <p>{strings.Login}</p>
            </div>
        )
    }
}