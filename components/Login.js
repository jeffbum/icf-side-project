import React from 'react'
import { Link, browserHistory } from 'react-router'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this)
        this.loggedInHandler = this.loggedInHandler.bind(this)
    }
    login(){
        fetch('/api/login?email=' + this.state.email + '&password=' + this.state.password, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.loggedInHandler)
        .catch((error) => {
          console.log('There has been a problem with your login fetch operation: ' + error.message)

        })
    }

    loggedInHandler(response) {
        console.log(response)
        if (typeof response.user != 'undefined') {
            sessionStorage.setItem('api_token', response.user.api_token)
            sessionStorage.setItem('user_id',
                JSON.stringify(response.user.id))
        }
        else {
            response.forEach(function(error) {
                var errorDiv = document.createElement('div')
                errorDiv.classList.add('alert', 'alert-danger')
                errorDiv.innerHTML = error
                document.querySelector('#errors').appendChild(errorDiv)
            })
        }
        browserHistory.push('/find_beer')
    }


    render() {
        return (
            <div>
                <div className="container">
                    <h2 className="">Login</h2>
                    <br/>
                    <br/>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" className="form-control" required value={this.state.email} onChange={(e) => this.setState({email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" className="form-control" required value={this.state.password} onChange={(e) => this.setState({password:e.target.value})}/>
                    </div>
                    <div className="form-group text-center logInLg">
                        <button id="login" type="button" className="btn btn-block" onClick={this.login}>Log In</button>
                        <br/>
                        <br/>
                        <br/>
                        <div className="logInSm">
                            <span>Dont have an account? </span><Link to='/signup'><button id="signup" type="button" className="btn center-block">Sign Up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login
