import React, { Component, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Clock from '../components/Clock'
import List from '../components/List'
import Message from '../components/Message'

export default function HomePage(props) {
    const location = useLocation()
    // useEffect(() => {
    //     minHeigth()
    // })
    const minHeigth = () => {
        const containerLists = document.querySelector(".homepage__content")
        const noauthSection = document.querySelector(".homepage__noauth")
        const heigth = containerLists.clientHeight
        noauthSection ? noauthSection.style.setProperty("--min-heigth", heigth + "px") : null
    }
    return <section className='homepage'>
        <h3 className='homepage__title'>homepage</h3>
        <section className='homepage__content__container'>
            <aside className='homepage__aside'>
                <Clock />
                <section className='aside__auth'>
                    {props.isAuthenticated ? <>
                        <p>Ya viste la página?</p>
                        <img className='likeBtn' src='https://cdn.pixabay.com/photo/2018/10/11/00/03/like-3738701_960_720.png' />
                        <p>Dame tu opinión...</p>
                    </> : <>
                        <Link to={"/login"} className='loginBtn'>LOGIN</Link>
                        <span className='or'>or</span>
                        <Link to={"/signup"} className='signupBtn'>SIGNUP</Link>
                    </>}
                </section>
            </aside>
            <section className='homepage__content'>
                {props.isAuthenticated ? <>
                    {props.lists.map(list => <List homepage={true} list={list} key={list.id} />)}
                </> : <>
                    <section className='homepage__noauth'>X</section>
                </>}
            </section>
        </section>


        {location.state ? (
            <Message message={location.state.a} extra={location.state.created} />
        ) : null}
    </section>
}