import { Component, createRef } from 'react'
import logo from '../../logo.svg'
import Waiting from '../waiting/Waiting.component'
import { Popup } from "../popup/Popup.component";

import './Auth.style.css'
import Login from './login/Login.component'
import Add from './add/Add.component'

class Auth extends Component {
  state = {
    enable: false,
  }

  constructor(props) {
    super(props);
    this.popup = createRef();
  }

  generatePopup = (message, time) => {
    this.popup.current.generatePop(message, time)
  }

  render() {
    const AddForm = (document.location.hash.slice(1)==="Add")
    return (
      <>
        <Popup ref={this.popup} />
        <div className='eclat__content--waiting'>
          <div className='eclat__logger'>
            <div className='eclat__interact'>
              <div className="eclat__logo-title">
                <img src={(this.props.logo)?this.props.logo:logo} alt="logo" />
              </div>
              <h1 className='eclat__title'>ÉCLAT - CONNEXION</h1>
            { (this.props.loader)?  <Waiting /> : (AddForm)? <Add onSubmitAddHandler={this.props.onSubmitAddHandler} />: <Login onSubmitHandler={this.props.onSubmitLoginHandler} />}
            </div>
            <div className="eclat__picture">
              <img src={(this.props.picture)?this.props.picture:logo} alt="logo" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Auth