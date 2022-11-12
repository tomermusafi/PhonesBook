import React from 'react'

function PhoneField({ contact, phone, showValue, removable, handleDeletedPhones }) {
    const removePhoneElement = (event) => {
        event.target.parentNode.remove();
        handleDeletedPhones(phone.Id);
    }
    return (
        <>
            {removable ? (<div className='phone'>
                <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    defaultValue={phone.Phone} id={phone.Id}></input>
                <div className='minus' onClick={removePhoneElement}>x</div>
            </div>) : (<div className='phone'>
                <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    id={(showValue &&
                        contact != null &&
                        contact.getContactPhones != null &&
                        contact.getContactPhones.length > 0) ?
                        contact.getContactPhones[0].Id : ""}
                    defaultValue={(showValue &&
                        contact != null &&
                        contact.getContactPhones != null &&
                        contact.getContactPhones.length > 0) ?
                        contact.getContactPhones[0].Phone : ""}>
                </input>
            </div>)}
        </>


    )
}
export default PhoneField