import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Homescreen from '../screens/home';
import RegisterScreen from '../screens/register';
import LoginScreen from '../screens/login';
import DashboardScreen from '../screens/dashboard';
import Sidebarmenu from '../screens/sidebar';
import InstallScreen from '../screens/install';
import UninstallScreen from '../screens/uninstall';
import ForgotPassword from '../screens/forgotpassword';
import ChangePassword from '../screens/changepassword';
import CommissionsScreen from '../screens/commissions';
import RankScreen from '../screens/rank';
import VolumesScreen from '../screens/volumes';

class Routes extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <Route exact path="/" component={Homescreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} /> 
            <Route exact path="/dashboard" component={DashboardScreen} />
            <Route exact path="/sidebar" component={Sidebarmenu} /> 
            <Route exact path="/install" component={InstallScreen} /> 
            <Route exact path="/uninstall" component={UninstallScreen} /> 
            <Route exact path="/forgotpassword" component={ForgotPassword} /> 
            <Route exact path="/changepassword"  component={ChangePassword} /> 
            <Route exact path="/commissions"  component={CommissionsScreen} /> 
            <Route exact path="/rank"  component={RankScreen} /> 
            <Route exact path="/volumes"  component={VolumesScreen} />
                             
          </div>
        </HashRouter>
      );
    }
  }
  
  export default Routes;