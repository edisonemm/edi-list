import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: this.props.list,
            tasksCompleted: this.props.list.items.filter(i => i.complete === true),
        }
    }
    render() {
        let { list, tasksCompleted } = this.state
        return <article className='lists__container__list'>
            <section className='lists__list__heading'>
                <h3 className='lists__list__title'>{list.name}</h3>
                {/* <p className='lists__list__username'>{s.list.user}</p> */}
                <span className='lists__list__totaltasks'>{list.items.length ? (
                    list.items.length === 1 ? "Una Tarea" : `${list.items.length} Tareas`
                ) : "Sin Tareas"}</span>
            </section>
            <section className='lists__list__numbertasks'>
                <article className='numbertasks__complete'>
                    <span className='numbertasks__complete__title'>🟩 Completadas</span>
                    <span className='numbertasks__complete__number'>{tasksCompleted.length}</span>
                </article>
                <article className='numbertasks__nocomplete'>
                    <span className='numbertasks__complete__title'>🟥 No completadas</span>
                    <span className='numbertasks__complete__number'>{list.items.length - tasksCompleted.length}</span>
                </article>
            </section>
            <section className='lists__list__items'>
                {list.items.map(item => <span key={item.id} className='lists__list__items__item'>{item.text}</span>)}
            </section>
            <Link to={"/lists/" + list.slug} className="lists__list__link"><span className='lists__list__link__text'>Ir a la lista <span className='link__icon'>➡</span></span></Link>
        </article>
    }
}