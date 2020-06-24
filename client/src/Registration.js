import React from 'react';
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: String,
      password: String,
      confirmPassword: String,
      date: Date
    }
    this.loginChange = this.loginChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.confirmPasswordChange = this.confirmPasswordChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(event) {
    fetch('http://localhost:9000/registration/', {
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
  loginChange(event) {
    this.setState({ login: event.target.value })
  }
  passwordChange(event) {
    this.setState({ password: event.target.value })
  }
  confirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value })
  }
  dateChange(event) {
    this.setState({ date: event.target.value })
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
