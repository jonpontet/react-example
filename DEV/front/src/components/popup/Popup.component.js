import { Component } from 'react'
import './Popup.style.css'
import info from './info.svg'

window.closePopup = (evt) => {
  const elem = evt.target || evt
  const elemPopupSelected = elem.closest('.popup__content')
  if(elemPopupSelected) {
    elemPopupSelected.classList.add('popup__closing')
    setTimeout(()=>{elemPopupSelected.remove()}, 500)
  }
}

export class Popup extends Component {

  generatePop = (message, time=false, type="default") => {
    const htmlElem = document.createElement('div'),
      container = document.querySelector('.popup')
    
      
      //`<div class="popup__content popup__${type}"><div class="popup__close" onClick="closePopup(this);">x</div></div>`
      
      if (container) {
        htmlElem.classList.add('popup__content')
        htmlElem.classList.add(`popup__${type}`)
        htmlElem.insertAdjacentHTML('beforeend', `<img src="${info}" alt="info" class="popup__picto" /><div>${message}</div>`)
        
        const buttonClose = document.createElement('div')

        buttonClose.innerText = 'x'
        buttonClose.classList.add("popup__close")

        htmlElem.insertAdjacentElement('beforeend', buttonClose)

        buttonClose.onclick = window.closePopup

        if(time) setTimeout(()=>{buttonClose.click()}, time)

        container.insertAdjacentElement('beforeend', htmlElem)
      }
  }

  render() {
    return (
      <div className='popup'></div>
    )
  }
}