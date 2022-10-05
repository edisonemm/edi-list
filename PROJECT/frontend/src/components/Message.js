import React, { useState } from 'react'

export default function Message(props) {
    const [isclosed, setClose] = useState(false)
    const handleClickClose = () => {
        setClose(true)
    }

    return <section className={`messages${isclosed ? " closed" : ""}`}>
        <p>{props.message}</p>
        <p>{props.extra}</p>
        <article className='messages__close' onClick={handleClickClose}>
            <span className='messages__close__icon'>❌</span>
        </article>
    </section>

}
