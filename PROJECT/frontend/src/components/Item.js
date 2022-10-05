import React, { Component } from 'react'
import TaskOptions from './TaskOptions'


export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.item,// complete: props.item.complete
            // editing: false
        }
    }

    taskClassComplete = () => {
        return this.state.item.complete ? " complete" : ""
    }

    CompleteTask = () => {
        this.setState({ item: { ...this.state.item, complete: !this.state.item.complete } });
    }

    EditTask = () => {
        this.props.EditTask(this.state.item.text, this.state.item.id)
        // this.setState({ editing: true })
    }

    DeleteTask = () => {
        // console.log("first")
        this.props.DeleteTask(this.state.item)
    }

    render() {
        const item = this.state.item
        return <article className={`item${this.taskClassComplete()}${this.props.editTask === item.id ? " editing" : ""}${this.props.taskDeleted.id === item.id ? " eliminated" : ""}`}>
            <section className='item__data'>
                {/* <p>{item.id}</p> */}
                <p className='item__text'>{item.text}</p>
                {/* <p>{item.complete}</p> */}
            </section>
            <span className='item__status' title='Tarea completada ✅'>
                ✅
            </span>
            <TaskOptions DeleteInfo={item.text} DeleteTask={this.DeleteTask} EditTask={this.EditTask} CompleteTask={this.CompleteTask} complete={item.complete} id={item.id} />
        </article>
    }
}