import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CommissionsScreen from "./comission-screen";

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      frameworkInspector: false
    };
  }
  componentWillMount() {
    // this.subscription = showFrameworkObservable.subscribe(newValue => this.setState({frameworkInspector: newValue}));
  }
  render() {
    let match = useRouteMatch();
    console.log('Url', match);
    return (
      // <HashRouter>
      <div>
        {/* <Route exact path="/commissions-scr"  component={CommissionsScreen} />    */}
        {/* <Switch>
          <Route
            path={`${match.url}/commissions`}
            component={CommissionsScreen}
          />
        </Switch> */}
        <p>asdasdadas</p>
      </div>
      // </HashRouter>
    );
  }
  // componentWillUnmount() {
  //   this.subscription.dispose();
  // }
}
