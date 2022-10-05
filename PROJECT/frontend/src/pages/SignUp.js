import React, { Component, createRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import ShowPass from '../components/ShowPass'

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', email: '', password: '', password2: '',
            validator: {
                username: '', email: '', password: '', password_confirmation: ''
            },
            created: false, //signup
            showPass: false
        }
        this.inputUsername = createRef()
        this.inputEmail = createRef()
        this.inputPassword = createRef()
        this.inputPassword2 = createRef()

        this.focusF = this.focusF.bind(this)
    }
    focusF = (element) => {
        element.current.focus()
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { username, email, password, password2 } = this.state
        if (username && password && password2) {
            password !== password2 ? (this.focusF(this.inputPassword),
                this.setState({ validator: { ...this.state.validator, password: "Las contraseñas no coinciden." } })
            ) : this.fethSignup()
        } else {
            username ? (
                password ? this.focusF(this.inputPassword2) : this.focusF(this.inputPassword)
            ) : this.focusF(this.inputUsername)
        }
    }

    checkedChangeState = (checked) => {
        this.setState({ showPass: checked })
        checked ? this.focusF(this.inputPassword) : null
    }


    render() {
        if (this.state.created) {
            return <Navigate to={"/login"} replace={true} state={{ created: "User created" }} />
        }
        const { username, email, password, non_field_errors, password_confirmation } = this.state.validator
        return <section className='signup'>
            <h3 className='signup__title'>SignUp</h3>
            <form className='signup__form' onSubmit={this.handleSubmit}>
                <p>
                    <span>{username ? <span>Este <b>username</b> ya esta en uso.</span> : ""}</span>
                    <input type={"text"} placeholder="username" name='username' onChange={this.handleChange} value={this.state.username} ref={this.inputUsername} autoFocus />
                </p>
                <p>
                    <span>{email ? "Introduzca una dirección de correo electrónico válida." : ""}</span>
                    <input type={"email"} placeholder="Email (opcional)" name='email' onChange={this.handleChange} value={this.state.email} ref={this.inputEmail} />
                </p>
                <section className='signup__container__inputs__password'>
                    <span>{password ? !password.toString().startsWith("L") ? (
                        "Asegúrese de que este campo tenga al menos 8 caracteres."
                    ) : password : (
                        non_field_errors ? !non_field_errors[1] ? (
                            "Esta contraseña es demasiado común."
                        ) : (<>Esta contraseña es demasiado común.<br/>Esta contraseña es completamente numérica.</>
                        ) : ""
                    )}</span>
                    <section className='signup__inputs__password'>
                        <input className='signup__input__password' type={this.state.showPass ? "text" : "password"} placeholder="Password" name='password' autoComplete={this.state.showPass ? "off" : ""} onChange={this.handleChange} value={this.state.password} ref={this.inputPassword} />
                        <input className='signup__input__password2' type={this.state.showPass ? "text" : "password"} placeholder="Password Confirm" name='password2' autoComplete={this.state.showPass ? "off" : ""} onChange={this.handleChange} value={this.state.password2} ref={this.inputPassword2} />
                    </section>
                    <ShowPass checkedChangeState={this.checkedChangeState} />
                </section>
                {/* <p>
                    <span>{password_confirmation ? "Asegúrese de que este campo tenga al menos 8 caracteres." : ""}</span>
                </p> */}
                <p><button className='signup__button signupBtn'>SIGNUP</button> or <Link to={"/login"}>Login</Link></p>
            </form>
        </section>
    }

    fethSignup = () => {
        const { username, email, password, password2 } = this.state
        fetch('/api/auth/signup/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.props.csrftoken,
            },
            body: JSON.stringify({ username: username, email: email, password: password, password_confirmation: password2 })
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data.first_name || data.first_name === '') {
                    // console.log("CREATED")
                    this.setState({ created: true })
                } else {
                    this.setState({ validator: data });
                    let inpFoc = data.username ? this.inputUsername : (
                        data.email ? this.inputEmail : this.inputPassword
                    )
                    this.focusF(inpFoc)
                }
            },
                (error) => {
                    console.log("errors", error)
                }
            )
            .catch(error => {
                console.log("error", error)
            })
    }

}