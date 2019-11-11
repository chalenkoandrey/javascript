import React from 'react';
import { watchFile } from 'fs';
class Home extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem("token")
    fetch('http://localhost:9000/homepage/', {
      method: "GET",
      headers: {
        'authorization': "Token " + token,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(response => {
        if (response.status == 401) {
          localStorage.setItem("authorized", 0)
          throw 1
        }
        return response.json()
      })
      .then((result) => {
        localStorage.setItem("authorized", 1)
        this.setState({ user: result })
      })
  }
  render() {
    return (<div>
      <h2>Home</h2>
      <p>Name</p>
      <p><b>{this.state && this.state.user.name}</b></p>
      <p>Date</p>
      <p>{this.state && this.state.user.date}</p>
      <p>List friend:</p>
      <p>{this.state && this.state.user.friends.map((friend) => {
        return (<p>{friend}</p>)
      })}</p>
      <p>List friend Requsest:</p>
      <p>{this.state && this.state.user.friendsrequest.map((friend) => {
        return (<p>{friend}</p>)
      })}</p>
    </div>);
  }

}
export default Home;