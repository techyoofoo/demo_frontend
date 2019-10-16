import React, { Component } from 'react';
import { Link } from "react-router-dom";
import HomeHeaderscreen from './homeheader';
import PageFooter from './footer';
import '../App.css';
import '../styles/styles.css';
import '../styles/login.css';

class LoginScreen extends Component {

  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }
  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      console.log('Fields Message', fields);
      fields["UserName"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
      this.props.history.push('/dashboard');
      // alert("Form submitted");
    }

  }
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["UserName"]) {
      formIsValid = false;
      errors["UserName"] = "*Please enter your user name.";
    }

    if (typeof fields["UserName"] !== "undefined") {
      if (!fields["UserName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["UserName"] = "*Please enter alphabet characters only.";
      }
    }


    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    // if (typeof fields["password"] !== "undefined") {
    //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    // }
    console.log('Error Message', this.state.errors, '-----------', errors);
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  // btnLoginClick = () => {
  //   submituserRegistrationForm = () => {
  //   console.log('Wsadas')
  //   // return  <Link to="/#/register/" />
  //   this.props.history.push('/dashboard');
  // }
  render() {
    const BASE_URL = '#'
    return (
      <div>
        <div className="container-fluid">
          <HomeHeaderscreen />
          <div className="row Loginvbg container-login100">
            <div className="col-sm-2"></div>
            <div className="col-sm-4">

              <div className="wrap-login100 p-l-55 p-r-55 p-t-25 p-b-25">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-49">
                    Login
			        		</span>

                  <div className="wrap-input100 validate-input">
                    <span className="label-input100">Username</span>
                    <input className="input100" type="text" name="UserName" placeholder="Type your username" value={this.state.fields.UserName} onChange={this.handleChange} />
                    <span className="focus-input100"><i class="far fa-user fa_icon"></i></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.UserName}</div>

                  <div className="wrap-input100 validate-input m-t-20">
                    <span className="label-input100">Password</span>
                    <input className="input100" type="password" name="password" placeholder="Type your password" value={this.state.fields.password} onChange={this.handleChange} />
                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                  </div>
                  <div className="errorMsg">{this.state.errors.password}</div>

                  <div className="text-right p-t-8 p-b-31">
                  <Link to="/forgotpassword" className="btn btn-link">  Forgot password? </Link>                   
                  </div>

                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" onClick={this.submituserRegistrationForm}>
                        Login
						        	</button>
                    </div>
                  </div>
                  <div className="flex-col-c p-t-15">
                    <span className="txt1 p-b-17">
                      Or Sign Up Using
				        		</span>

                    <a href="#" className="txt2">
                    <Link to="/register" className="btn btn-link"> Sign Up </Link>
				        		</a>
                  </div>
                </form>
              </div>

              {/* <div>
                <div className="formgroup">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <span className="fa fa-user facolor" aria-hidden="true" />
                    </span>
                    <input type="text" name="UserName" className="form-control" placeholder="User Name" value={this.state.fields.UserName} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.UserName}</div>
                  </div>
                </div>
                <div className="wrap-input100 validate-input m-b-23">
                    <span className="label-input100">Username</span>
                    <input className="input100" type="text" name="username" placeholder="Type your username" value={this.state.fields.UserName} onChange={this.handleChange} />
                    <span className="focus-input100" data-symbol="&#xf206;"></span>

                  </div>
                  <div className="errorMsg">{this.state.errors.UserName}</div>
                <div className="formgroup">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <span className="fa fa-key facolor" aria-hidden="true" />
                    </span>
                    <input type="Password" name="password" className="form-control" placeholder="Password" value={this.state.fields.password} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.password}</div>
                  </div>
                  <div className="form-group text-center">
                    <div className="floatcheck">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    </div>
                    <div className="floatl cpadding1"> Remember me</div>
                    <div className="floatr">
                      <a href="#top" className="btn btn-link"> Forgot Password</a>
                    </div>
                  </div>
                </div>
                <div className="form-group text-center btnmrgn">
                  <button type="submit" className="btn btn-lg btn-primary btn-block mb-1 btnshadow" onClick={this.submituserRegistrationForm}>
                    LOG IN
                        </button>
                  <div className="floatl cpadding1"> Don't have an account? <Link to="/register" className="btn btn-link">Register Here</Link></div>

                </div>
              </div> */}



            </div>
            <div className="col-sm-2"></div>

          </div>
          <PageFooter />
        </div>

      </div>
    )
  }
}

export default LoginScreen;
