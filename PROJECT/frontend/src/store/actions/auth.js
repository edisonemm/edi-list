import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationDate * 1000)
    }
}

export const authLogin = (username, password, csrftoken) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/api/auth/login/', {
            username: username,
            password: password
        }, {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
            .then(res => {
                const token = res.data.token
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

// export const authSignUp = (username, email, password1, password2) => {
//     return dispatch => {
//         dispatch(authStart());
//         axios.post('/api/auth/signup/', {
//             username: username,
//             email: email,
//             password: password1,
//             password_confirmation: password2
//         })
//             .then(res => {
//                 // console.log("resssss",res)
//                 const token = res.data.token
//                 const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
//                 localStorage.setItem('token', token)
//                 localStorage.setItem('expirationDate', expirationDate)
//                 dispatch(authSuccess(token))
//                 dispatch(checkAuthTimeout(3600))
//             })
//             .catch(err => {
//                 dispatch(authFail(err))
//             })
//     }
// }

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (token === undefined) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }

    }
}