import React from 'react'

export default function ShowPass(props) {
    const handleChecked = (e) => {
        props.checkedChangeState(e.target.checked)
    }
    return <article className='showpassword'>
        <input className='showpassword__checkbox' type={"checkbox"} id={'showpassword'} onChange={handleChecked} />
        <label className='showpassword__label' htmlFor='showpassword'> Mostar contraseña</label>
    </article>
}
