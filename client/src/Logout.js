import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap'
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.DeleteToken = this.DeleteToken.bind(this);
  }

  DeleteToken(event) {
    localStorage.removeItem("token");
    localStorage.setItem("authorized", 0)
    this.props.history.push("/Login/");
  }
  render() {
    return (<div><h2>
      Logout
    </h2>
      <ButtonToolbar>
        <Button variant="outline-danger" onClick={this.DeleteToken}>Logout</Button>
        <Button href="/Home/" variant="success" onClick={this.ReturnHome}>Return home</Button>
      </ButtonToolbar>
    </div>
    )
  }
}
export default Logout;