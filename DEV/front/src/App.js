import { Component, createRef } from "react";
import Auth from "./components/auth/Auth.component";
import axios from 'axios'
import { PagePwa } from "./components/pagepwa/PagePwa";


class App extends Component {
  
  state = {
    displayLogger: true,
    user: null,
    waiting: true
  }

  constructor(props) {
    super(props);
    this.auth = createRef()
    this.PagePwa= createRef()
  }

  parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('ath-tk')

    console.log('token resp', this.parseJwt(token))
    if(token) 
      axios.post('http://api-rci.localhost/', {
        token
      })
      .then(resp=>{
        const { data } = resp.data
        this.setState({ displayLogger:!data.connected })
        this.setState({ waiting:false })
        this.setState({user: this.parseJwt(token)?.user})
      })
      .catch(error=>console.log({error}))
    else {
      this.setState({ waiting:false })
    }
  }

  onLogin(evt) {
    evt.preventDefault()
    this.setState({ waiting: true })
    const form = evt.target,
      login = form.login.value,
      password = form.password.value

    axios.post('http://api-rci.localhost/user/login',{login,password})
    .then(response=>{
      const { connected, token } = response.data

      if(token)  localStorage.setItem('ath-tk', token)
      
      this.setState({ waiting: false })

      if(connected) {
        this.setState({ displayLogger: false })
        this.setState({user: this.parseJwt(token)?.user})
      }
    })
    .catch(error=>{
      console.log(error.response.data.error)
      this.setState({ waiting: false })
      this.auth.current.generatePopup(`Erreur d'authentification! Veuillez vous assurer de bien remplir les champs du formulaire.`,false)
    })
    //this.setState({ displayLogger: false })
  }

  onAddUser(evt) {
    evt.preventDefault()
    this.setState({ waiting: true })

    const form = evt.target,
      login = form.login.value,
      password = form.password.value,
      permissions = form.permissions.value

      axios.post('http://api-rci.localhost/user/add',{login, password, permissions})
      .then(response=>{
        console.log(response)
        document.location.href = '/'
      })
      .catch(error=>{
        console.log(error.response.data.error)
        document.location.href = '/'
      })
  }

  onLogout = () => {
    console.log('ONLOGOUT')
    this.setState({ displayLogger: true })
    localStorage.removeItem('ath-tk')
  }

  render() {
    const mustLog = this.state.displayLogger
    return (
      <>
        { (mustLog) ? (<Auth ref={this.auth} onSubmitLoginHandler={(evt)=>{this.onLogin(evt)}} onSubmitAddHandler={(evt)=>{this.onAddUser(evt)}} loader={this.state.waiting} />):(<PagePwa ref={this.PagePwa} onLogout={()=>{this.onLogout()}} user={this.state.user} />) }
      </>
    )
  }
}

export default App;
