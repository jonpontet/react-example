import { Component } from 'react'

import './Login.style.css'


class Login extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmitHandler} className="eclat__login">
        <input type="text" name="login" id="login" placeholder="Login" required />
        <input type="password" name="password" id="password" placeholder="Mot de passe" required />
        <input type="submit" value="Login" />  
      </form>
    )
  }
}

export default Login