import React from 'react'
import './Contact.css'

function Contact({ contact, popupController, setDataHasChanged, dataHasChanged }) {
    return (
        <div className='contact' onClick={() => popupController(true, "UPDATE", contact, setDataHasChanged, dataHasChanged)}>
            {contact.Photo != null && contact.Photo.length > 0 ? (
                <img className='contactPhoto' src={contact.Photo} />
            ) :
                <div className='contactPhoto' >{(contact.Name.toUpperCase()[0])}</div>
            }
            <div className='contactName'>{contact.Name}</div>
        </div>
    )
}
export default Contact