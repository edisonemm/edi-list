import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import List from '../components/List'


class ToDoLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // lists: this.props.lists, //estas es jodio(por esto no servia)
        }
    }


    render() {
        // const { lists } = this.props
        // console.log(this.props.lists)
        return <section className='lists'>
            <h2 className='lists__title'>Listas </h2>

            <section className='lists__container'>

                {this.props.isAuthenticated ? ( this.props.lists[0] ? (
                    this.props.lists.map(list => <List list={list} key={list.id} />)
                ) : <section className='lists__nolists'>No hay listas</section>
                ) : <p>No ha iniciado sesión. <Link to={"/login?next=" + window.location.pathname}>iniciar sesión</Link></p>
                }
            </section>
        </section>
    }
}

const mapStateToProps = state => {
    return {
        // token: state.token,
        isAuthenticated: state.token !== null
    }
}
export default connect(mapStateToProps, null)(ToDoLists);
