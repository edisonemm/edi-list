import React, { Component } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
// import * as act

import Item from '../components/Item'
import TaskForm from '../components/TaskForm'
import NotFound404 from './404NotFound'
// import Loading from '../components/Loading'
// import { getList } from '../utils'


function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation()} />;
}

class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: {},
            items: [],
            isLoaded: false,
            error: null,

            editing: false,
            editTask: "",
            itemid: "",

            taskDeleted: {},
        }
        this.addTask = this.addTask.bind(this)
    }
    addTask = (array) => {
        this.setState({ "items": array })
        this.props.HandleChangeList(this.state.list.id, array, "create")
    }
    UpdateTask = (item) => {
        this.setState({
            items: this.state.items.map(itemstate => {
                if (itemstate.id === item.id) {
                    itemstate.text = item.text
                }
                return itemstate
            }),
        })
        this.CancelEditingProps()
    }
    DeleteTask = (item) => {
        // this.setState({
        //     items: this.state.items.filter(itemstate => itemstate.id !== item.id)
        // });
        console.log(item)
        this.setState({ taskDeleted: item })
        setTimeout(
            function () {
                this.RemovingStateTask(item)
            }
                .bind(this),
            1000
        );
    }
    RemovingStateTask = (item) => {
        const url = `/api/items/${item.id}/`
        const method = "DELETE"
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.props.csrftoken,
                'Authorization': "Token " + this.props.token
            },
            body: JSON.stringify({})
        })
            .then(res => {
                if (res.ok) {
                    this.setState({
                        items: this.state.items.filter(itemstate => itemstate.id !== item.id)
                    });
                    setTimeout(() => { //esperar que se actualize
                        this.props.HandleChangeList(this.state.list.id, item)
                        // console.log(this.state.items)
                    }, 500)
                }
            })
    }

    //Editing para que funcionara con el boton, fue poniendolo a lo contrario
    EditTask = (textTask = null, itemid = null) => {
        this.setState({ editing: false })
        this.setState({ editTask: textTask })
        this.setState({ itemid: itemid })
    }
    CancelEditingProps = () => {
        this.setState({ editing: true })
        this.setState({ editTask: "" })
        this.setState({ itemid: "" })
    }

    render() {
        console.log(this.props.token)
        if (this.state.error) {
            return <NotFound404 />
        }
        if (this.state.isLoaded) {
            const listName = this.state.list.name ? this.state.list.name : "List_name"
            return <section className={`list list-animated`}>
                <article className='list__heading'>
                    <h3 className='list__title'>{listName}</h3>
                    {/* <p className='list__user'>{this.state.list.user}</p> */}
                </article>
                {this.props.isAuthenticated ? (
                    <TaskForm token={this.props.token} isAuthenticated={this.props.isAuthenticated} UpdateTask={this.UpdateTask} itemId={this.state.itemid} taskText={this.state.editTask} isEditing={this.state.editing} addTask={this.addTask} CancelEditingProps={this.CancelEditingProps} listid={this.state.list.id} csrftoken={this.props.csrftoken} />
                ) : <TaskForm noAuth={true} />}
                <section className={`list__items${this.state.items.length > 7 ? " responsive-height" : ""}${this.state.items.length > 15 ? " responsive-height-15" : ""}`}>
                    {this.state.items[0] ? (
                        this.state.items.map(item => <Item DeleteTask={this.DeleteTask} EditTask={this.EditTask} taskDeleted={this.state.taskDeleted} editTask={this.state.itemid} item={item} key={item.id} />)
                    ) : (this.props.isAuthenticated ? (
                        <article className='list__items__noitems'>No hay tareas</article>
                    ) : (
                        <p>No ha iniciado sesión. <Link to={"/login?next=" + this.props.location.pathname}>iniciar sesión</Link></p>
                    )
                    )}
                </section>
            </section >
        } else {
            return ""
        }
    }

    fetchList = () => {
        const url = "/api/todolists/?slug=" + this.props.params.slug
        fetch(url, {
            headers: {
                Authorization: "Token " + this.props.token
            }
        })
            .then((res) => res.json())
            .then((list) => {
                if (list.error) {
                    this.setState({
                        isLoaded: true,
                        error: { "message": "Debes iniciar sesión" }
                    })
                }
                if (!list.error) {
                    this.setState({
                        list: list[0],
                        items: list[0].items,
                    });
                    this.setState({ isLoaded: true })
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.fetchList()
        } else {
            this.setState({ isLoaded: true })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoaded !== this.state.isLoaded) { //para isLoaded
            if (!this.state.list.name) { // cuando no hay listas
                if (this.props.isAuthenticated) {
                    // console.log(this.state.isLoaded)
                    this.setState({ isLoaded: false })
                }
            }
        }
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            if (this.props.isAuthenticated) {
                this.fetchList()
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

// export default withParams(ListPage);
export default withParams(connect(mapStateToProps, null)(ListPage));

