import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Accordion, Card } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { PageHeader, PageFooter } from './header';
import Sidebarmenu from './sidebar';
import '../App.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

import axios from 'axios';
const BASE_URL = `http://localhost:6003/`;
const BASE_URL_ROLE = `http://localhost:6005/`;



function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  console.log(props)
  return (
    <input type="checkbox" className="ckboxalign" />
    // <SvgIcon className="close" fontSize="inherit" {...props}>
    //     {/* tslint:disable-next-line: max-line-length */}
    //     <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    // </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

// const useStyles = makeStyles({
//     root: {
//         height: 264,
//         flexGrow: 1,
//         maxWidth: 400,
//     },
// });

class RoleAccessScreen extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.RoleAccessForm = this.RoleAccessForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false, background: '#296091',
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      roles: []
    };
  }

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    this.bindRolesDropdown()
  }
  SideNavBarcloseClick = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  SideNvaBaropenClick = () => {
    if (!this.state.sidebarClose) {
      this.setState({ sidebarClose: true });
      document.getElementById("mySidenav").style.width = "200px";
      document.getElementById("main").style.marginLeft = "200px";
    }
    else {
      this.setState({ sidebarClose: false })
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleClick = () => {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));
  };

  handleOutsideClick = e => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  };

  bindRolesDropdown() {
    axios
      .get(BASE_URL_ROLE + "rouge/role/get")
      .then((response) => {
        this.setState({
          roles: response.data
        });
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  RoleAccessForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { fields } = this.state
      let formData = {
        id: '',
        firstname: fields.FirstName,
        // lastname: fields.LastName,
        // email: fields.EmailId,
        // age: Number(fields.Age),
        // gender: fields.Gender,
        // password: fields.Password,
        // username: fields.FirstName + "" + fields.LastName,
        // mobileno: fields.MobileNo,
        RoleAccess: fields.RoleAccess,
        // roleid: fields.Role,
        // companyname: fields.CompanyName,
      }
      const config = {
        headers: {
          "content-type": "application/json"
        }
      };
      axios.post(BASE_URL + `rouge/user/create`, JSON.stringify(formData), config)
        .then(response => {
          alert(response.data.Message);
          if (response.status === 201) {
            let fields = {};
            this.setState({ fields: fields });
            this.onCloseModal();
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["FirstName"]) {
      formIsValid = false;
      errors["FirstName"] = "*Please enter your Role access Name.";
    }

    if (typeof fields["FirstName"] !== "undefined") {
      if (!fields["FirstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["FirstName"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["RoleAccess"]) {
      formIsValid = false;
      errors["RoleAccess"] = "*Please select role.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    const useStyles = {
      height: 264,
      flexGrow: 1,
      maxWidth: 400
    }
    const BASE_URL = '#'
    const { open, roles } = this.state;
    const styleBack = {
      backgroundColor: this.state.background,
      height: '60px'
    }
    const styleBack1 = {
      backgroundColor: this.state.background
    }
    return (
      <div>
        <div className="container-fluid">
          {/* <PageHeader headerColor={this.state.background}/> */}
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
                    <button className="btn btn-outline-light" onClick={this.RoleAccessForm}>
                      <Link to="/changepassword" className="btn btn-link"> Change Password  </Link></button>
                  </li>
                  <li>
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
          <div>
            <Sidebarmenu sidebarCloseProp={this.state.sidebarClose} />
            <div id="main">
              <div className="row sidebarhdr">
                <div className="col-md-12">
                  <div className="row">
                    <div className="navbar-header">
                      <a className="navbar-minimalize minimalize-styl-2 btn btn-primary navbaralign" onClick={this.SideNvaBaropenClick}>
                        <i className="fa fa-bars"></i> </a>
                    </div>
                    <h3><span className="toppdng">Role Access </span></h3>
                  </div>
                </div>
              </div>

              <div className="col-md-12 p-t-25">
                <div className="row">
                  <div className="col-sm-5">
                    <div className="p-l-55 p-r-55 p-b-25">
                      <div className="login100-form validate-form">
                        <div className="wrap-input100 validate-input">
                          <span className="label-input100">Name</span>
                          <input className="input100" type="text" name="FirstName" placeholder="Type your Role access Name" value={this.state.fields.FirstName || ''} onChange={this.handleChange} />
                          <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="errorMsg">{this.state.errors.FirstName}</div>

                        <div className="wrap-input100 validate-input m-t-20">
                          <span className="label-input100"> Role </span>
                          <select name="RoleAccess" className="input100" value={this.state.fields.RoleAccess || ""} onChange={this.handleChange}>
                            <option value="">-- Select --</option>
                            <option value="Role1">Role 1</option>
                            <option value="Role2">Role  2</option>
                          </select>
                        </div>
                        <div className="errorMsg">{this.state.errors.RoleAccess}</div>

                        <div className="container-login100-form-btn p-t-31 p-b-25">
                          <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button className="login100-form-btn" onClick={this.RoleAccessForm}>
                              Submit
                        </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="col-sm-5">
                  <span className="label-input100"> Access  </span>
                  <div className="mrgtop">
                    <TreeView
                      style={{ useStyles }}
                      defaultExpanded={['1']}
                      defaultCollapseIcon={<MinusSquare />}
                      defaultExpandIcon={<PlusSquare />}
                      defaultEndIcon={<CloseSquare />}
                    >
                      <StyledTreeItem nodeId="1" label="Main">
                        <StyledTreeItem nodeId="2" label="Hello" />
                        <StyledTreeItem nodeId="3" label="Subtree with children">
                          <StyledTreeItem nodeId="6" label="Hello" />
                          <StyledTreeItem nodeId="7" label="Sub-subtree with children">
                            <StyledTreeItem nodeId="9" label="Child 1" />
                            <StyledTreeItem nodeId="10" label="Child 2" />
                            <StyledTreeItem nodeId="11" label="Child 3" />
                          </StyledTreeItem>
                          <StyledTreeItem nodeId="8" label="Hello" />
                        </StyledTreeItem>
                        <StyledTreeItem nodeId="4" label="World" />
                        <StyledTreeItem nodeId="5" label="Something something" />
                      </StyledTreeItem>
                    </TreeView>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-footer">
            <PageFooter footerColor={this.state.background} />
          </div>
        </div>

      </div >
    )
  }
}

export default RoleAccessScreen;
