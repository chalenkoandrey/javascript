import React from 'react';
import './App.css';
import Users from './Users'
import Login from './Login'
import Home from './Home'
import Registration from './Registration'
import Logout from './Logout'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserPage from './UserPage';
function About() {
  return <h2>About</h2>;
}
class App extends React.Component {
  state = {
    authorized: true
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link to="/">Home</Link>
                  </td>
                  <td>
                    <Link to="/about/">About</Link>
                  </td>
                  <td>
                    <Link to="/users/">Users</Link>
                  </td>
                  <td>
                    <Link to="/Login/">Login</Link>
                  </td>
                  <td>
                    <Link to="/Registration/">Registration</Link>
                  </td>
                  <td>
                    <Link to="/Logout/">Logout</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/login/" component={Login} />
          <Route path="/user/" component={UserPage} />
          <Route path="/Registration/" component={Registration} />
          <Route path="/Logout/" component={Logout} />
        </div >
      </Router>)
  }
};

export default App;
