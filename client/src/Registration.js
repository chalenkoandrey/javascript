import React from 'react';
class Registration extends React.Component {
  state = {
    login: String,
    password: String,
    confirmPassword: String,
    date: Date
  }
  submit(event) {
    fetch('http://localhost:3000/registration/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'name=' + this.state.login + '&date=' + this.state.date + '&password=' + this.state.password
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ token: result["token"] })
        localStorage.setItem("token", result["token"])
        localStorage.setItem("authorized", 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentDidMount() {

  }
  render() {
    if (localStorage.getItem("authorized") == 1) {
      return (<div>
        Already authorized
      </div>)
    }
    else
      return (<div>
        <h2>Registration</h2>
        <form id="registration" onSubmit={this.submit}>
          First name:<br></br>
          <input type="text" value={this.state.login} onChange={this.loginChange} name="name"></input>
          <p>Password:</p>
          <input type="password" value={this.state.password} onChange={this.passwordChange} name="password"></input>
          <p>Confirm password:</p>
          <input type="password" value={this.state.confirmPassword} onChange={this.confirmPasswordChange} name="confirmPassword"></input>
          <p>Date</p>
          <p><input type="date" value={this.state.date} onChange={this.dateChange} name="date"></input></p>
          <p><input type="submit"></input></p>
        </form>
      </div>);
  }

}
export default Registration;