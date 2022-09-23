import { Component } from 'react'

import './Add.style.css'


class Add extends Component {
  render() {
    return (
      <>
      <h3>Ajout d'un user</h3>
      <form onSubmit={this.props.onSubmitAddHandler} className="eclat__login">
        <input type="text" name="login" id="login" placeholder="Login" required />
        <input type="password" name="password" id="password" placeholder="Mot de passe" required />
        <input type="permissions" name="permissions" id="permissions" placeholder="Permissions " required />
        <input type="submit" value="Login" />  
      </form>
      </>  
    )
  }
}

export default Add