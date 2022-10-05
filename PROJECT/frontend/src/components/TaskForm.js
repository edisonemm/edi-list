import React, { Component, createRef } from 'react'


export default class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: "",
            taskEditing: "",
            isEditing: false
        }
        this.taskInput = createRef()

        this.InputFocus = this.InputFocus.bind(this)
        this.ReiniciarEditing = this.ReiniciarEditing.bind(this)
        this.CancelarEditing = this.CancelarEditing.bind(this)
        this.fetchF = this.fetchF.bind(this)

        this.CreateTasksRender = this.CreateTasksRender.bind(this)
    }

    InputFocus() {
        this.taskInput.current.focus()
    }

    handleChangeForm = (e) => {
        let text = e.target.value
        this.setState({ task: text })
    }

    ReiniciarEditing() {
        this.setState({ task: this.state.taskEditing })
        this.InputFocus()
    }
    CancelarEditing() {
        this.setState({ task: "" })
        this.setState({ isEditing: false })
        this.props.CancelEditingProps()
        this.InputFocus()
    }
    CreateTasksRender(items) {
        return this.props.addTask(items)
    }
    fetchNewTask = (e) => {
        e.preventDefault()
        if (this.state.task.trim() && this.props.isAuthenticated) {
            // console.log(this.props.itemId)
            const urlCreate = `/api/items/?listid=${this.props.listid}`
            const urlUPdate = `/api/items/${this.props.itemId}/`

            const logic2 = this.state.task !== this.state.taskEditing
            // console.log(logic2()) // por si no hay cambios en el editing para no hacer peticiones
            let url = this.state.isEditing ? (
                logic2 ? urlUPdate : false
                ) : urlCreate
            let method = this.state.isEditing ? "PATCH" : "POST"
            let body = this.state.isEditing ? { "text": this.state.task } : { "todolist": this.props.listid, "text": this.state.task }
            let then = this.state.isEditing ? (params)=>this.props.UpdateTask(params) : (params)=>{this.props.addTask(params);this.setState({ task: "" });this.InputFocus()}
            
            url ? this.fetchF(url, method, body, then) : this.InputFocus()
        } else {
            this.InputFocus()
        }
    }

    fetchF(url, method, body, then) {
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.props.csrftoken,
                'Authorization': "Token " + this.props.token
            },
            body: JSON.stringify(body)
        }
        ).then((res) => res.json())
            .then(res => {
                then(res)
            })
    }

    render() {
        return <section className='taskform'>
            <article className='taskform__container'>
                <form className='taskform__form' onSubmit={this.fetchNewTask}>
                    <input className='taskform__input' onChange={this.handleChangeForm} type='text' placeholder={`Alguna tarea...${this.props.noAuth ? " (Pero primero debes iniciar sesión 👍)":""}`} value={this.state.task} ref={this.taskInput} autoFocus  />
                    {this.state.isEditing ? (
                        <section className='taskform__input__options'>
                            {this.state.task != this.state.taskEditing ? (
                                <span className='taskform__input__reiniciar' onClick={this.ReiniciarEditing} title="Reiniciar editar tarea" >🔄</span>
                            ) : null}
                            <span className='taskform__input__cancel' onClick={this.CancelarEditing} title="Cancelar editar tarea">❌</span>
                        </section>
                    ) : (
                        ""
                    )}
                    <button placeholder='Add' className='taskform__button' >Add</button>
                </form>
            </article>
        </section>
    }
    componentDidUpdate(prevProps) {
        if (this.props.isEditing !== prevProps.isEditing ||
            this.props.taskText !== prevProps.taskText) {
            this.setState({ isEditing: !this.props.isEditing }) //a lo contrario para que duncionara con el boton
            this.setState({ task: this.props.taskText })
            this.setState({ taskEditing: this.props.taskText })
            this.InputFocus()
        }
    }
}