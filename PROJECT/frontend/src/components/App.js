import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'

import Header from './Header';
import HomePage from '../pages/HomePage';
import ToDoLists from '../pages/ToDoList';
import ListPage from '../pages/ListPage';
import LoginSingup from '../pages/LoginSigup';
import NotFound404 from '../pages/404NotFound';
import Footer from './Footer';
import SignUp from '../pages/SignUp';
import LogOut from '../pages/LogOut';
import DarkMode from './DarkMode';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lists: []
        }
        this.fetchLists = this.fetchLists.bind(this)
        this.csrftoken = this.getCookie('csrftoken');
    }
    getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    fetchLists() {
        fetch("/api/todolists/", {
            headers: {
                Authorization: "Token " + this.props.token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return false
                }
            }).then((result) => {
                if (result) {

                    this.setState({
                        isLoaded: true,
                        lists: result
                    })
                } else {
                    this.setState({
                        error: { "message": "Debes iniciar sesión" }
                    })
                }
            })
            .catch((error) => console.log(error))

    }
    UpdateStateLists = (listId, item, created = null) => {
        // console.log(listId, item, created)
        this.setState({
            lists: this.state.lists.map(liststate => {
                if (liststate.id === listId) {
                    if (created) {
                        liststate.items = item
                    } else {
                        liststate.items = liststate.items.filter(itemstate => itemstate.id !== item.id)
                    }
                }
                return liststate
            })
        })
    }

    render() {
        return <section>
            <Router>
                <Header isAuthenticated={this.props.isAuthenticated} />
                <DarkMode />
                <Routes>
                    <Route path="/" element={<HomePage lists={this.state.lists} isAuthenticated={this.props.isAuthenticated}/>} />
                    <Route path="lists/" element={<ToDoLists lists={this.state.lists} />} />
                    <Route path="lists/:slug" element={<ListPage HandleChangeList={this.UpdateStateLists} csrftoken={this.csrftoken} />} />
                    <Route path="/login" element={<LoginSingup isAuthenticated={this.props.isAuthenticated} csrftoken={this.csrftoken} />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/signup" element={<SignUp isAuthenticated={this.props.isAuthenticated} csrftoken={this.csrftoken} />} />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
                <Footer />
            </Router>
        </section>
    }
    componentDidMount() {
        this.props.onTryAutoSignup()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            if (this.props.isAuthenticated) {
                this.fetchLists()
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />);        