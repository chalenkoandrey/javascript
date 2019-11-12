import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap'
class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.AddToFriends = this.AddToFriends.bind(this);
  }
  AddToFriends(event) {
    console.log("send req")
  }
  iduser = this.props["location"]["pathname"].split("/")[2]
  componentDidMount() {
    fetch('http://18.224.44.130:9000/user/' + this.iduser, {
      method: "GET",
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ user: result["result"] })
      })
  }
  render() {
    return (<div>
      <h2>User page</h2>
      <p>Name</p>
      <p><b>{this.state && this.state.user.name}</b></p>
      <p>Date</p>
      <p>{this.state && this.state.user.date}</p>
      <p>List friend:</p>
      <p>{this.state && this.state.user.friends.map((friend) => {
        return (<p>{friend}</p>)
      })}</p>
      <Button onClick={this.AddToFriends}>add to friends</Button>
    </div>);
  }

}
export default UserPage;
