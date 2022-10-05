import React from 'react'

export default function DarkMode(props) {
    const handleClickMode = () => {
        document.querySelector("html").classList.toggle("dark-mode")
    }

    return <article className='darkmodeBtn' title='Cambiar modo' onClick={handleClickMode}>
        <span className='darkmodeBtn__dark'>🌙</span>
        <span className='darkmodeBtn__ligth'>☀</span>
    </article>

}
