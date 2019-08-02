import React, { Component } from 'react'
import './index.css'
import { Redirect } from 'react-router-dom'
class Home extends Component {
  constructor(){
    super();
      this.state = {
        profileImage: '',
        fullName:'',
        isLogout: false
      }
      this.onLogout = this.onLogout.bind(this);
  }
  componentWillMount(){

  let fbData =  JSON.parse(localStorage.getItem('fbData'))
  let googleData = JSON.parse(localStorage.getItem('googleData'))
  if (!fbData && !googleData){
    this.setState({isLogout: true})
  }

  if(fbData){
    this.setState({profileImage:fbData.picture, fullName: fbData.name})
  }
  else if(googleData){
    this.setState({profileImage:googleData.picture, fullName: googleData.name})
  }}
  onLogout(e){
    //setear todas las var de localStorage en blanco y redirect a inicio
    localStorage.clear();
    this.setState({isLogout: true})
  }

  render(){
    if(this.state.isLogout){
      return ( <Redirect to="/"></Redirect>)
    }


    return(
      <div className="Home">
        <nav className="home-nav">
          <div className="nav-wrapper">
            <a className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>{ this.state.fullName }</li>
              <li><img className="circle" src={this.state.profileImage} alt="Profile Img" width="48px"/> </li>
              <li >
                <i onClick={ this.onLogout } className="Home-logout fa fa-power-off" > </i>
                </li>

              
            </ul>

          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
