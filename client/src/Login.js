import React from 'react';
import App from './App';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: String,
      password: String,
      token: String
    }
    this.loginChange = this.loginChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(event) {
    fetch('http://18.224.44.130:9000/login/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'name=' + this.state.login + '&password=' + this.state.password
    })
      .then(response => response.json())
      .then(result => {
        localStorage.setItem("token", result["token"])
        localStorage.setItem("authorized", 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  loginChange(event) {
    this.setState({ login: event.target.value })
  }
  passwordChange(event) {
    this.setState({ password: event.target.value })
  }
  render() {
    if (localStorage.getItem("authorized") == true) {
      this.props.history.push("/");
      return (<div>
        Already authorized
      </div>)
    }
    else
      return (
        <div>
          <h2>Login</h2>
          <form id="login" onSubmit={this.submit}>
            First name:<br></br>
            <input type="text" onChange={this.loginChange} name="name"></input>
            <p>password:</p>
            <input type="password" onChange={this.passwordChange} name="password"></input>
            <p><input type="submit"></input></p>
          </form>
        </div >
      );
  }
}
export default Login
