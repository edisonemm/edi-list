import React from 'react'


export default NotFound404 => {
    return <section className='notfound404'>
        <article className='notfound404__heading'>
            <p className='notfound404__title bold'>NotFound404</p>
        </article>
        <article className='notfound404__content'>
            <span>No se encontró <mark>{window.location.pathname}</mark></span>
        </article>
    </section>
}