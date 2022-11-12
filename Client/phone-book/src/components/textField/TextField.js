import React from 'react'

function TextField({ label, defaultValue, reference }) {
    return (
        <div className='field'>
            <label>{label}</label>
            <input type="text" ref={reference} defaultValue={defaultValue}></input>
        </div>
    )
}
export default TextField