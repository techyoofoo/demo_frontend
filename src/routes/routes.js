import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
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
// import RankScreen from '../screens/rank';
// import VolumesScreen from '../screens/volumes';
import MenuScreen from '../screens/menu';
// import SubmenuScreen from '../screens/submenu';
import UserGroupsScreen from '../screens/usergroups';
import RoleScreen from '../screens/role';
import UserScreen from '../screens/user';
import RolePermissionScreen from '../screens/rolepermission';

export default class Root extends React.Component {
constructor() {
super();
this.state = {
frameworkInspector: false
};
}
componentWillMount() {
// console.log('Welcome to Manifest');
// const socialMediaList = data.version_no;
// console.log('Welcome to Manifest', socialMediaList, data.menu);
// this.subscription = showFrameworkObservable.subscribe(newValue => this.setState({frameworkInspector: newValue}));
}
render() {
return (
<HashRouter>
<div>
<Route exact path="/" component={Homescreen} />
<Switch>
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
{/* <Route exact path="/rank"  component={RankScreen} />
<Route exact path="/volumes"  component={VolumesScreen} /> */}
<Route exact path="/menu"  component={MenuScreen} />
{/* <Route exact path="/submenu"  component={SubmenuScreen} /> */}
<Route exact path="/usergroups"  component={UserGroupsScreen} />
<Route exact path="/role"  component={RoleScreen} />
<Route exact path="/user"  component={UserScreen} />
<Route exact path="/rolepermission"  component={RolePermissionScreen} />
</Switch>
{/* <Switch>
<Route exact path="/commissions" component={CommissionsScreen} />
</Switch> */}
{/* <Route exact path="/commissions"  component={CommissionsScreen} />  */}
{/* <Route exact path="/rank" component={RankScreen} /> */}

</div>
</HashRouter>
);
}
// componentWillUnmount() {
//   this.subscription.dispose();
// }
}
