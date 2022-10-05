import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'

function LogOut(props) {
    const navigate = useNavigate()
    useEffect(() => {
        props.logout()
        navigate('/', {state:{a:"Logout"}, replace:true})
    }, []);
    return (
        <></>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);