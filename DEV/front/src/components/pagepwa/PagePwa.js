import { Component } from 'react'
import { Header } from '../header/Header.component'
import { MenuN3 } from '../menuN3/MenuN3.component';

function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38" className="header__icon">
      <defs>
        <symbol id="home" viewBox="0 0 17 17">
          <path
            fill="#7a7a7a"
            d="M8.6 1.6L.8 8.5l2.3.032v6.4h2.3v-4.7h3.3v4.7h5.4l-.034-6.3 2.3-.039-7.7-6.9zM10 10h2.9v2.9H10V10z"
          ></path>
        </symbol>
        <symbol id="document" viewBox="0 0 17 17">
          <path
            fill="#7a7a7a"
            d="M4.1.8c-.88 0-1.6.71-1.6 1.6v12c0 .88.71 1.6 1.6 1.6h9.2c.88 0 1.6-.71 1.6-1.6V5.1L10.1.4H4zm5.4 1.3l4.3 4.3H9.5V2.1zM7.8 8.6h1.8v6.3H7.8V8.6zm-2.9 1.5h1.7v4.8H4.9v-4.8zm6.1 1.4h1.7v3.4H11v-3.4z"
          ></path>
        </symbol>
        <symbol id="params" viewBox="0 0 17 17">
          <path
            fill="#7a7a7a"
            d="M6.6.95v2.4a5.5 5.5 0 00-1.8 1.1l-2.2-1.4-1.9 3 2.4 1.6a5.5 5.5 0 00-.088.97 5.5 5.5 0 00.09.98L.802 11l1.9 3 2.1-1.3a5.5 5.5 0 001.9 1.1V16h3.5v-2.2a5.5 5.5 0 001.8-.99l2.2 1.4 1.9-3-2.3-1.5a5.5 5.5 0 00.13-1.2 5.5 5.5 0 00-.12-1.2l2.2-1.4-1.9-3-2.1 1.3a5.5 5.5 0 00-1.9-1.1V.81h-3.5zm1.9 4.9a2.7 2.7 0 012.7 2.7 2.7 2.7 0 01-2.7 2.7 2.7 2.7 0 01-2.7-2.7 2.7 2.7 0 012.7-2.7z"
          ></path>
        </symbol>
        <symbol id="users" viewBox="0 0 17 17">
          <g fill="#7a7a7a" transform="translate(0 -.53)">
            <path d="M6.3 12l-1.9 2 2 2.1v-1.2h3.9v1.2l2-2.1-1.9-2v1.3H6.3zM5.7 7.2C2 7.204 1.5 9 1.5 9v1.8h8.6V9s-.54-1.8-4.2-1.8h-.17z"></path>
            <circle cx="11" cy="3.7" r="2"></circle>
            <circle cx="5.7" cy="3.7" r="2"></circle>
            <path d="M11 7.2c4.5.006 4.7 1.7 4.7 1.7v1.9H12l.032-2.1s-.003-1.4-1-1.5z"></path>
          </g>
        </symbol>
        <symbol id="clipboard" viewBox="0 0 17 17">
          <path
            fill="#7a7a7a"
            d="M8.4 1.3a2.1 1.7 0 00-2.1 1.4H3c-.88 0-1.6.71-1.6 1.6V14c0 .88.71 1.6 1.6 1.6h11c.88 0 1.6-.71 1.6-1.6V4.3c0-.88-.71-1.6-1.6-1.6h-3.4a2.1 1.7 0 00-2.1-1.4zm-.029 1.1a.98.98 0 01.98.98.98.98 0 01-.98.98.98.98 0 01-.98-.98.98.98 0 01.98-.98zm3.5 3.8a.73.73 0 01.52.21.73.73 0 010 1l-4.9 4.9a.73.73 0 01-1 0l-2.1-2.1a.73.73 0 010-1 .73.73 0 011 0l1.6 1.6 4.4-4.4a.73.73 0 01.52-.21z"
          ></path>
        </symbol>
        <symbol id="upload" viewBox="0 0 17 17">
          <g fill="#7a7a7a">
            <path d="M2.5 1.1c-.93 0-1.7.75-1.7 1.7v12c0 .93.75 1.7 1.7 1.7h12c.93 0 1.7-.75 1.7-1.7v-12c0-.93-.75-1.7-1.7-1.7h-12zm-.057 1.7h12v8.5h-3.5a2.5 2.5 0 01.005.082 2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 01.004-.082h-3.5V2.8z"></path>
            <path d="M6.7 10h3.2V7.4h1.7L8.4 4.3 5.2 7.4h1.6z"></path>
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

export class PagePwa extends Component {
  render(){
    return (
      <>
        <Icon />
        <Header onLogout={this.props.onLogout} user={this.props.user} />
        <main className="main">
          <MenuN3 />
        </main>
      </>
    )
  }
}