import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props.isAuthenticated)
        return <header className="header">
            <h1 className='bold'>Edi_ lists</h1>
            <nav>
                <ul className='menu'>
                    <li><NavLink to="/">Home</NavLink></li>
                    {this.props.isAuthenticated ? (<>
                        <li><NavLink to="/lists">Lists</NavLink></li>
                        <li><NavLink to="/logout" className="logoutBtn">Logout</NavLink></li>
                    </>
                    ) : <li><NavLink to="/login" className="loginBtn">Login</NavLink></li>
                    }
                </ul>
            </nav>
        </header>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Header);