import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { SketchPicker } from 'react-color';
import PageHeader from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

export default class PageFooter extends Component {
  handler = () => {
    console.log('sadasdasads')
  }
  render() {   
    return (
      <div>
         <div className="row">
            <div className="col-md-12 Footer" onClick = {this.props.handler}>Copyright © 2019 Rogue All Rights Reserved</div>
          </div>
      </div>
    )
  }
}