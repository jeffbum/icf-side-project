import React from 'react'
import { Link, browserHistory } from 'react-router'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            images: '',
        }
        this.signedUpHandler = this.signedUpHandler.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.signup = this.signup.bind(this)
        this.login = this.login.bind(this)
    }


    signedUpHandler(response) {
        console.log(response)
        if (typeof response.user != 'undefined') {
            sessionStorage.setItem('api_token', response.user.api_token)
            sessionStorage.setItem('user_id',
                JSON.stringify(response.user.id))
            this.login()
        }
        else {
            response.forEach(function(error) {
                var errorDiv = document.createElement('div')
                errorDiv.classList.add('alert', 'alert-danger')
                errorDiv.innerHTML = error
                document.querySelector('#errors').appendChild(errorDiv)
            })
        }
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
        .then(browserHistory.push('/'))
        .catch((error) => {
          console.log('There has been a problem with your login fetch operation: ' + error.message)
        })


    }

    handleClick() {
        this.signup()
    }

    signup() {
        console.log(this.state.images)
        var data = new FormData()
            data.append('email', this.state.email)
            data.append('password', this.state.password)
            data.append('name', this.state.name)
            data.append('images', this.state.images)
        fetch('/api/signup', {
            body: data,
            method: 'POST'
        })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.signedUpHandler)
        .catch(function(error) {
        console.log('There has been a problem with your signup fetch operation: ' + error.message)
        })
    }


    render() {
        return (
            <div>
                <div className="container">
                    <h2 className="">Sign Up</h2>
                    <br/>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="form-control" required value={this.state.name} onChange={(e) => this.setState({name:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-control" required value={this.state.email} onChange={(e) => this.setState({email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="form-control" required value={this.state.password} onChange={(e) => this.setState({password:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Picture</label>
                        <input type="file" id="images" name="images" onChange={(e) =>{
                                this.setState({images:e.target.files[0]})
                                console.log(e.target.files[0])
                            }}/>
                    </div>
                    <div className="form-group text-center logInLg">
                        <button id="signup" type="button" className="btn btn-block" onClick={this.handleClick}>Sign Up
                            </button>
                        <br/>
                        <br/>
                        <br/>
                        <div className="logInSm">
                            <span>Already have an account? </span><Link to='/login'><button id="login" type="button" className="btn center-block">Log In</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup
