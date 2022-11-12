import React from 'react'
import './ContactList.css'
import Contact from '../contact/Contact'

function ContactList({contacts, popupController, hasMore, loadMore}) {
    return (
        <div className='contactList'>
        {contacts && contacts.length > 0 && (
          <div className="contacts">
            {contacts.map(contact => (
              <Contact contact={contact} key={contact.Id} popupController={popupController}></Contact>
            ))}
            {hasMore && contacts.length >= 5 && (<div className='loading' onClick={loadMore}>Load more</div>)}
          </div>
        )}
      </div>
    )
}
export default ContactList