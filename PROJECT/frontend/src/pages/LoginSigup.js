import React, { Component, createRef } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'
import Message from '../components/Message'
import ShowPass from '../components/ShowPass'


function withHooks(Component) {
    return props => <Component {...props} location={useLocation()} />;
}

class LoginSingup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            next: "",
            showPass: false
        }
        this.fetchlogin = this.fetchlogin.bind(this)
        this.inputUsername = createRef()
        this.inputPassword = createRef()
    }
    focusF = (element) => {
        element.current.focus()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.username && this.state.password) {
            this.fetchlogin()
        } else {
            this.state.username ? this.focusF(this.inputPassword) : this.focusF(this.inputUsername)
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchlogin() {
        this.props.onAuth(this.state.username, this.state.password, this.props.csrftoken)
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
    //         if (this.props.isAuthenticated) {
    //             // this.setState({ username: "", password: "" })
    //         }
    //     }
    // }
    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            if (this.props.error) {
                if (this.props.error.response.data.password) {
                    this.focusF(this.inputPassword)
                } else {
                    this.focusF(this.inputUsername)
                }
            }
        }
    }
    componentDidMount() {
        const next = new URLSearchParams(window.location.search).get('next')
        this.setState({ next: next })
    }

    checkedChangeState = (checked) => {
        this.setState({ showPass: checked })
        checked ? this.focusF(this.inputPassword) : null
    }

    render() {
        if (this.props.isAuthenticated) {
            let to = this.state.next ? this.state.next : "/"
            return <Navigate to={to} replace={true}
                state={{
                    a: this.state.username ? "inicio de sesión" : "Ya ha iniciado sesión",
                    created: !this.state.username ? this.props.location.state ? this.props.location.state.created :  null : null
                }} />
        }
        const { error } = this.props
        return <section className='login'>
            <h3 className='login__title'>Login</h3>
            <form className='login__form' onSubmit={this.handleSubmit}>
                {/* {this.state.validator ? this.state.validator.non_field_errors || "Asegúrese de que este campo tenga al menos 8 caracteres." : ("no hay errores")} */}
                <article className='login__errors'>
                    {error ? error.response.data.non_field_errors : null}
                </article>
                <p className='login__conatiner__username'>
                    <input className='login__input__username' placeholder='Username' name='username' type={"text"} value={this.state.username} onChange={this.handleChange} ref={this.inputUsername} autoFocus />
                </p>
                <section className='login__container__password'>
                    <span className='login__errors__password'>{error ? error.response.data.password ? (
                        "Asegúrese de que este campo tenga al menos 8 caracteres.") : null : null}
                    </span>
                    <input className='login__input__password' placeholder='Password' name='password' type={this.state.showPass ? "text" : "password"} autoComplete={this.state.showPass ? "off" : ""} value={this.state.password} onChange={this.handleChange} ref={this.inputPassword} />
                    <ShowPass checkedChangeState={this.checkedChangeState} />
                </section>
                <p className='login__container__button'>
                    <button className='login__button loginBtn'>LOGIN</button> or <Link to={"/signup"}>Signup</Link>
                </p>
            </form>
            {this.props.location.state ? (
                <Message message={this.props.location.state.created} />
            ) : null}
        </section>
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, csrftoken) => dispatch(actions.authLogin(username, password, csrftoken))
    }
}

export default withHooks(connect(mapStateToProps, mapDispatchToProps)(LoginSingup));
