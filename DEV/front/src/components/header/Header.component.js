import { Component, createRef } from 'react'
import logo from '../../logo.svg'
import { Popup } from "../popup/Popup.component";

function User() {
  return (
    <div className="header__user-icon">
      <svg viewBox="0 0 16 16" id="person-fill"  xmlns="http://www.w3.org/2000/svg"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></svg>
    </div>
  )
}

export class Header extends Component {

  constructor(props) {
    super(props);
    this.popup = createRef();
  }


  render() {
    return (
      <header className="header">
        <div className="header__left">
          <div className="header__burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img src={logo} alt="logo" className="header__logo" />
        </div>
        <Popup ref={this.popup} />
        <div className="header__user">
          <div className="header__user-infos">
            <div className="header__user-name">{this.props.user.name}</div>
            <div className="header__user-button" onClick={this.props.onLogout}>Logout</div>
          </div>
          <User />
        </div>
      </header>
    )
  }
}