import { Component } from 'react'

function Icon(props) {
  return (
    <svg className="nav__icon">
      <use xlinkHref={`#${props.icon}`}></use>
    </svg>
  )
}

export class MenuN3 extends Component {
  render() {
    return(
      <>
        <nav className="nav">
          <div className="nav__button">
            <Icon icon="home" />
          </div>
          <div className="nav__button">
            <Icon icon="clipboard" />
          </div>
          <div className="nav__button">
            <Icon icon="document" />
          </div>
          <div className="nav__button">
            <Icon icon="users" />
          </div>
          <div className="nav__button">
            <Icon icon="params" />
          </div>
        </nav>
      </>
    )
  }
}