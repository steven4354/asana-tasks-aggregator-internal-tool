import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signup } from "../actions";
// import validator from 'validator';
import { Redirect } from 'react-router-dom'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
        // name: "",
        email: '',
        password: '',
        // disabled : true,
        redirect : false
    };
  }
  
  signUp = () => {
    const data = {
      username: this.state.email,
      password: this.state.password 
    }
    
    this.props.signup(data, () => {
      this.setState({redirect: true})
    })
   
  }
  
  popUp = () => {
    if (this.props.errorMessage){
      alert(`${this.props.errorMessage}, try logging in`);
    }
  }

  renderRedirect = () => {
    if (this.state.redirect || this.props.auth) {
      return <Redirect to='/asana' />
    }
  }

  render() {
    // if (this.state.name && this.state.email && this.state.password){
    //   this.undisable()
    // }
  
    return (  
      <div>
        {this.renderRedirect()}
        <div className = "section">
          <div className = "container"> 
            <h1 className = "heading">
              Signup
            </h1>
            {this.popUp()}
            <div className = "wrap">
              <div className="w-form">
                <form  name="email-form" data-name="Email Form" className="form">
                  {/* <div className="div-block">
                    <div className = "formunit">
                      <label>Full Name</label>
                      <input 
                        placeholder='Full Name'
                        value={this.state.name}
                        onChange={(e) => { this.setState({ name: e.target.value })}}
                        type="text" 
                        className="text-field w-input" 
                        maxLength="256" 
                        name="name" 
                      />
                    </div>
                    
                  </div> */}
                  <div className="form-check form-check-inline" >
                    {/* <label>Username</label> */}
                    <input 
                      type="email" 
                      className="form-control"  
                      maxLength="256" 
                      placeholder="User Name" 
                      value={this.state.email}
                      onChange={(e) => { this.setState({ email: e.target.value })}}
                    />
                  </div>
                  <div className="form-check form-check-inline" >
                    {/* <label>Password</label> */}
                    <input 
                      type="password" 
                      className="form-control"  
                      maxLength="256" 
                      name="Password" 
                      data-name="Password" 
                      placeholder="Password" 
                      value={this.state.password}
                      onChange={(e) => { this.setState({ password: e.target.value })}}
                    />
                  </div>
                  {/* <input type="submit" value="Sign Up" data-wait="Please wait..." className="submit-button w-button"/> */}
                    <button type= "button" className="btn btn-primary"  id = "submit" onClick = {()=>{this.signUp()}}>Sign Up</button>
                    
                  <div>Have an account? <a href="/login" className="link">Log In</a></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated
   };
}


// const validate = formValues => {

//   if(!formValues.email) {
//     return 'You must enter an email'
//   }

//   else if(formValues.email){
//     if(!validator.isEmail(formValues.email)) {
//       return "You must enter a valid email address"
//     }
//   }

//   else if(!formValues.password){
//     return "You must enter a password"
//   }
//   else if (formValues.password.length !== 8){
//     return "Password must be minimum 8 characters"
//   }
//   else if(!formValues.name){
//     return "You must enter your name"
//   }
//   else if(!formValues.username){
//     return "You must enter a username"
//   }
//   else{
//     return null
//   }
// };


export default compose(
  connect(mapStateToProps, { signup })
)(Signup);