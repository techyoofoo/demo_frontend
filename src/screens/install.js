import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Accordion, Card } from "react-bootstrap";
import { SketchPicker } from "react-color";
import Multiselect from "multiselect-dropdown-react";
import { PageHeader, PageFooter } from "./header";
import Sidebarmenu from "./sidebar";
// import PageFooter from './footer';
import "../App.css";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

//----------------------Select Data --------------//
const data = [
  {
    name: "one",
    value: "one"
  },
  {
    name: "two",
    value: "two"
  },
  {
    name: "three",
    value: "three"
  },
  {
    name: "four",
    value: "four"
  },
  {
    name: "five",
    value: "five"
  },
  {
    name: "six",
    value: "six"
  }
];

class InstallScreen extends Component {
  result(params) {
    console.log(params);
  }
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.submitinstallForm = this.submitinstallForm.bind(this);

    this.state = {
      popupVisible: false,
      show: false,
      background: "#296091",
      open: false,
      sidebarClose: true,
      values: [],
      fields: {},
      errors: {},
      file: undefined,
      plugin_name: "-",
      author: "-",
      app_version: "-",
      copyright: "-",
      description: "-",
      company_name: "-"
      // colorCode:''
    };
  }
  //----------------------Side Bar --------------//

  componentDidMount() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
  }
  SideNavBarcloseClick = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };
  SideNvaBaropenClick = () => {
    if (!this.state.sidebarClose) {
      this.setState({ sidebarClose: true });
      document.getElementById("mySidenav").style.width = "200px";
      document.getElementById("main").style.marginLeft = "200px";
    } else {
      this.setState({ sidebarClose: false });
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  //-----------------Form validate------------//
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }
  submitinstallForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["FirstName"] = "";
      fields["SearchData"] = "";
      fields["Description"] = "";
      this.setState({ fields: fields });
      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("name", this.state.fields.FirstName);
      // formData.append("description", this.state.description);
      // formData.append("package", "asd");
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      axios
        .post("http://localhost:9002/un-zip", formData, config)
        .then(response => {
          console.log("response", response);

          alert("The file is successfully uploaded");
        })
        .catch(error => {});
      // alert("Form submitted");
    }
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // if (!fields["FirstName"]) {
    //   formIsValid = false;
    //   errors["FirstName"] = "*Please enter your first name.";
    // }

    // if (typeof fields["FirstName"] !== "undefined") {
    //   if (!fields["FirstName"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["FirstName"] = "*Please enter alphabet characters only.";
    //   }
    // }

    // if (!fields["SearchData"]) {
    //   formIsValid = false;
    //   errors["SearchData"] = "*Please Select Data.";
    // }

    // if (typeof fields["SearchData"] !== "undefined") {
    //   if (!fields["SearchData"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["SearchData"] = "*Please Select Data.";
    //   }
    // }

    // if (!fields["Description"]) {
    //   formIsValid = false;
    //   errors["Description"] = "*Please enter your Description.";
    // }

    // if (typeof fields["Description"] !== "undefined") {
    //   var pattern = new RegExp(
    //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    //   );
    //   if (!pattern.test(fields["Description"])) {
    //     formIsValid = false;
    //     errors["Description"] = "*Please enter Description.";
    //   }
    // }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  //-----------------End Form validate------------//

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
  onFileChange = selFile => {
    console.log("---File Data--", selFile.target.files[0]);
    this.setState({ file: selFile.target.files[0] });
    //extract-manifest-data
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const formData = new FormData();
    formData.append("file", selFile.target.files[0]);
    formData.append("name", this.state.fields.FirstName);
    //---------------------Local storage-------------------------------
    let pluginsData;
    if(localStorage.getItem("installed_plugins") === null)
    {
      pluginsData = []
    } else{
      pluginsData = JSON.parse(localStorage.getItem("installed_plugins"));
    }
    const splitFileName = selFile.target.files[0].name.split(".")
    pluginsData.push(splitFileName[0]);
    localStorage.setItem("installed_plugins", JSON.stringify(pluginsData));   
    const distElements = [...new Set(JSON.parse(localStorage.getItem("installed_plugins")))]
    console.log('---dist Ele', distElements)
    //---------------------Local storage-------------------------------
    axios
      .post("http://localhost:9002/extract-manifest-data", formData, config)
      .then(response => {
        console.log("response------", response.data);
        this.setState({
          plugin_name: response.data.file_info.plugin_name,
          author: response.data.file_info.app_author,
          app_version: response.data.file_info.app_version,
          copyright: response.data.file_info.app_copyright,
          description: response.data.file_info.app_description,
          company_name: response.data.file_info.company_name
        });
      })
      .catch(error => {
        throw error;
      });
  };
  render() {
    console.log("this.state.file", this.state.file);
    const BASE_URL = "#";
    const { open } = this.state;
    const styleBack = {
      backgroundColor: this.state.background,
      height: "60px"
    };
    const styleBack1 = {
      backgroundColor: this.state.background
    };
    console.log("Background", this.state.background);
    return (
      <div>
        <div className="container-fluid">
          {/* <PageHeader />          */}
          <div className="row fixed-header" style={styleBack1}>
            <div className="col col-sm-6 col-md-2">
              <div className="logo" style={styleBack}>
                <Link to="/dashboard">
                  <img
                    className="img-fluid logopdng"
                    src="../images/logo.png"
                    alt="logo"
                  ></img>
                </Link>
              </div>
            </div>
            <div className="col col-sm-6 col-md-10 textalign changepassword">
              <div className="innerlinks">
                <ul>
                  <li>
                    <button
                      className="btn btn-outline-light"
                      onClick={this.submituserRegistrationForm}
                    >
                      <Link to="/changepassword" className="btn btn-link">
                        {" "}
                        Change Password{" "}
                      </Link>
                    </button>
                  </li>
                  <li>
                    <div
                      className="popover-container"
                      ref={node => {
                        this.node = node;
                      }}
                    >
                      <button
                        className="btn btn-outline-light"
                        onClick={this.handleClick}
                      >
                        Change Color Theme
                      </button>
                      {this.state.popupVisible && (
                        <div className="popover">
                          <SketchPicker
                            color={this.state.background}
                            onChangeComplete={this.handleChangeComplete}
                          />
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
                    <div class="navbar-header">
                      <a
                        class="navbar-minimalize minimalize-styl-2 btn btn-primary navbaralign"
                        onClick={this.SideNvaBaropenClick}
                      >
                        <i class="fa fa-bars"></i>{" "}
                      </a>
                    </div>
                    <h3>
                      <span className="toppdng">Install </span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="col-md-2"></div>
                <div className="col-md-4 innercontent">
                  <div className="form-group formrgn1">
                    {/* <div className="input-group">
                      <span className="input-group-addon">
                        <span
                          className="fa fa-user facolor"
                          aria-hidden="true"
                        />
                      </span>
                      <input
                        type="text"
                        name="FirstName"
                        className="form-control"
                        placeholder="First Name"
                        value={this.state.fields.FirstName}
                        onChange={this.handleChange}
                      />
                    </div> */}
                    <div className="errorMsg">
                      {this.state.errors.FirstName}
                    </div>
                  </div>
                  <div className="form-group formrgn1">
                    <div className="input-group">
                      <div class="custom-file overflow-hidden rounded-pill mb-1">
                        {/* <input
                          id="customFile"
                          type="file"
                          class="custom-file-input rounded-pill"
                        /> */}
                        <input
                          id="customFile"
                          type="file"
                          className="custom-file-input rounded-pill"
                          name="file"
                          // onChange={e =>
                          //   this.setState({ file: e.target.files[0] })
                          // }
                          onChange={e => this.onFileChange(e)}
                        />
                        <label
                          for="customFile"
                          class="custom-file-label rounded-pill"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="form-group formrgn1">
                    <div className="input-group">
                      <div className="select_left App">
                        <Multiselect
                          options={data}
                          onSelectOptions={this.result}
                          class="form-control"
                          value={this.state.fields.SearchData}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="select_right">
                        <i
                          className="fa fa-caret-down drparw"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="errorMsg">
                        {this.state.errors.SearchData}
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="form-group formrgn1">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <span
                          className="fa fa-address-card facolor"
                          aria-hidden="true"
                        />
                      </span>
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                        value={this.state.fields.Description}
                        onChange={this.handleChange}
                      ></textarea>
                      <div className="errorMsg">
                        {this.state.errors.Description}
                      </div>
                    </div>
                  </div> */}
                  <div>
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Company Name</th>
                          <th scope="col">Plugin Name</th>
                          <th scope="col">Author</th>
                          <th scope="col">Version</th>
                          <th scope="col">Copyright</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>{this.state.company_name}</td>
                          <td>{this.state.plugin_name}</td>
                          <td>{this.state.author}</td>
                          <td>{this.state.app_version}</td>
                          <td>{this.state.copyright}</td>
                          <td>{this.state.description}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block mb-1 btnshadow"
                      onClick={this.submitinstallForm}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-footer">
            <PageFooter footerColor={this.state.background} />
          </div>
        </div>
      </div>
    );
  }
}

export default InstallScreen;
