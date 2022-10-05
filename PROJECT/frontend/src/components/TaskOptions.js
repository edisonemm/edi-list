import React, { Component, useRef, useState } from 'react'

export default function TaskOptions(props) {
    const [isActive, setActive] = useState(false)
    const [isActiveConfirm, setActiveConfirm] = useState(false)

    const toggleContainerActive = () => {
        setActive(!isActive)
    }

    const CompleteOnclick = (e) => {
        props.CompleteTask()
        toggleContainerActive()
    }
    const EditOnclick = (e) => {
        props.EditTask()
        toggleContainerActive()
    }

    const toggleDeleteActive = () => {
        setActiveConfirm(!isActiveConfirm)
    }

    const DeleteOnclick = () => {
        toggleDeleteActive()
        toggleContainerActive()
        checkMultipleContainer()
    }
    const DeleteOnclickConfirmed = () => {
        props.DeleteTask()
        toggleDeleteActive()
    }


    return <article className='task-options'>
        <article className='task-options__activer' onClick={toggleContainerActive}>...</article>
        <section className={`task-options__container ${isActive ? "active" : ""}`}>
            <ul className='task-options__options'>
                <li className='task-options__option' onClick={EditOnclick}>Editar</li>
                <li className='task-options__option option__complete' onClick={CompleteOnclick} >Completada</li>
                <li className='task-options__option option__delete' onClick={DeleteOnclick}>Eliminar</li>
            </ul>
        </section>
        <section className={`delete__confirm ${isActiveConfirm ? "active" : ""}`}>
            <article className='delete__confirm__container'>
                <p className='delete__confirm__title'>Confirmar</p>
                <article className='delete__confirm__form'>
                    <p className='delete__confirm__form__info'>Eliminar <span className='delete__confirm__nametask'>"{props.DeleteInfo}"</span>?</p>
                    <section className='delete__confirm__btns'>
                        <button className='delete__confirm__eliminar' onClick={DeleteOnclickConfirmed}>Eliminar</button>
                        <button className='delete__confirm__regresar' onClick={toggleDeleteActive}>Regresar</button>
                    </section>
                </article>
            </article>
        </section>
    </article>

    function checkMultipleContainer() {
        const containers = document.querySelectorAll(".delete__confirm.active")
        if (containers[0]) {
            for (let i = 0; i < containers.length; i++) {
                const container = containers[i].children[0]
                container.style.setProperty("--translate-px", `${(i + 1) * 4}px`)
            }
        }
    }
}