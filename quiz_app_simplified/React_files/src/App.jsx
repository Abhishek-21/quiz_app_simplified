import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* loginpanel is the login component made for admin to login using credentials */}
       <LoginPanel /> 
      </div>
    );
  }
}

class LoginPanel extends Component {
  // this following function slide is used to validate the admins credentials and open and reject
  // entry into the admin panel depending on the credentials validation
  slide = () => {
    document.getElementById("submit-button").style.animation = "slide normal 1s ease-in";
    const username = document.getElementById("login-id").value;
    const password = document.getElementById("password-id").value;
    let dataString = {
      username,
      password,
    };
    dataString = JSON.stringify(dataString);                        //binding username and password
    $.ajax({                                                        //making ajax call to database to validate credentials
      type: "post",
      contentType: "application/json",
      url: "http://localhost:8000/login",        
      data: dataString,
      success: function(response) {                                 //showing appropriate response 
        console.log(response.response_code);
        if(response.response_code !== 0) {
          setTimeout(() => {
            window.location="http://localhost:3000/home?user="+response.user_id;
            },1000);
        } else {
          document.getElementById("myForm").reset();  
          setTimeout(() => {
            document.getElementById("submit-button").style.animation = "";
          },2000); 
          document.getElementById("message-box").innerText = 'Invalid Credentials!!!';
          document.getElementById("message-box").style.display = "inline-block";
          $('#message-box').delay(2000).fadeOut('slow');
        }
      }
    });
  };

  render() {
    return (
      <div id="login-container-align">                       {/* this the login form container */}
        <div id="message-box"></div>
        <div id="login-container">
          <form id="myForm" action="/home">
            <table>
              <tbody>
                <tr>
                  <td>Login id:</td>
                  <td><input type="text" id="login-id" /></td>
                </tr>
                <tr>
                  <td>Password:</td> 
                  <td><input type="password" id="password-id" /></td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <div id="path-button">
                      <span id="submit-button" onClick={this.slide}>Login</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
