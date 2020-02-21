import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signin } from "../actions";
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect : false
        }

    }
    // undisable =  () => {
    //     if (this.state.disabled){
    //       this.setState({disabled: false})
    //     }
    //     document.getElementById("submit").style = {}; 
    // }

    // renderErrors = () => {
    //     if (this.props.errorMessage){
    //       return <div>{this.props.errorMessage}</div>
    //     }
      
    // }
    renderRedirect = () => {
        if (this.state.redirect || this.props.auth) {  
          return <Redirect to='/asana' />
        }
    }
    signIn = () =>{
        const data = {
            username: this.state.email, 
            password: this.state.password
        }
        this.props.signin(data, () => {
            this.setState({redirect: true})
        });

    }

    render(){
        // if (this.state.email && this.state.password){
        //     this.undisable()
        // }
        return (
            <span>
                {this.renderRedirect()}
                <div className="section">
                    <div className="container">
                    <h1 className="heading">Login</h1>
                    {/* {this.renderErrors()} */}
                        <div className="w-form">
                        <form  name="email-form" data-name="Email Form" className="form">
                            
                            <div className="form-check form-check-inline">
                                {/* <label>/</label> */}
                                <input 
                                type="email" 
                                className="form-control" 
                                maxLength="256" 
                                placeholder="Username" 
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value })}}
                                />
                            </div>
                            <div className="form-check form-check-inline" >
                                
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
                            <button type= "button" className="btn btn-primary"  id = "submit" onClick = {()=>{this.signIn()}}>Login</button>
                                
                            <div>Don't have an account? <a href="/signup" className="link">Sign Up</a></div>
                            </form>
                        </div>
                    
                    </div>
                </div>
            </span>
    );
    }
    
};
function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.errorMessage,
        auth: state.auth.authenticated
     };
}
export default compose(
    connect(mapStateToProps, { signin })
)(Login);
