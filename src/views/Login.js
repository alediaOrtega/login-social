import React, { Component } from "react";
import "./index.css";
import "materialize-css/dist/css/materialize.min.css";
 import FacebookLogin from 'react-facebook-login'; 
import { Redirect } from 'react-router-dom' ;
import GoogleLogin from 'react-google-login'

class Login extends Component {
    constructor(){
        super();
        
        this.state= {
            isLogged: false,
            social: ''
        }


        this.responseFacebook = this.responseFacebook.bind(this)
        this.responseGoogle = this.responseGoogle.bind(this)
        this.onFailure =  this.onFailure.bind(this);

    }
    componentWillMount(){
        if (localStorage.getItem('fbData') || localStorage.getItem('googleData')){
            this.setState({
                isLogged:true
            })
        }
    }
    responseFacebook(response){
        
        localStorage.setItem("fbData", JSON.stringify({
            token: response.token,
            email: response.email,
            name: response.name,
            picture: response.picture.data.url,
            social: 'fb'
        }))
        this.setState({ isLogged: true })
       
}
responseGoogle(response){
   localStorage.setItem('googleData',JSON.stringify({
    token: response.toke,
    email: response.profileObj.email,
    name: response.profileObj.name,
    picture: response.profileObj.imageUrl,
    social: 'google'

   }) )
   this.setState({ isLogged: true });
}
onFailure(error){
   console.log(error)
}


  render() {
      if (this.state.isLogged) {
          return(<Redirect to="home"/>)
      }
    return (
        <div className="Login">
        <div className="Login-box">
          <div className="card">
            <div className="card-content">
              <FacebookLogin
                appId="1623073147751611"
                autoload={ false }
                fields="name, email, picture.width(120)"
                callback={ this.responseFacebook }
                onFailure={ this.onFailure }
                textButton="Facebook"
                cssClass="waves-effect waves-light btn blue darken-2"
                icon="fa fa-facebook"/>
              <br/>
               
              
                <GoogleLogin
                clientId = "1019264648802-98eal8uohoi7udkcs1gg861p2gjgolle.apps.googleusercontent.com"
                autoLoad={ false }
                  onSuccess={ this.responseGoogle }
                  onFailure={ this.onFailure }
                  className="waves-effect waves-light btn red lighten-1">
                   
                    <span id="inicioSesion" >Iniciar Sesión</span>
                </GoogleLogin>
                
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;


