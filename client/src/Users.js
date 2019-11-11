import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
class Users extends React.Component {
  componentDidMount() {
    fetch('http://localhost:9000/users', { method: "GET" })
      .then(response => response.json())
      .then(result => {
        this.setState({ users: result["result"] })
      })
  }
  render() {
    return (<div>
      <h2>User List</h2>
      {
        this.state && this.state.users.map(name => {
          return (
            <p key={name["_id"]}><Link to={"/user/" + name["_id"]} > Username:{name["name"]} UserDate:
              < i > {name["date"]}</i></Link ></p>
          )
        })
      }
    </div >)
  }
}
export default Users