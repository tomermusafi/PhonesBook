import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import './ContactSearch.css'
import { getContacts } from '../../API/contact/contactAPIHandler'
import ContactList from '../contactList/ContactList'
function ContactSearch({ popupController, dataHasChanged }) {

  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getContactsHandle = (result) => {
    setHasMore(result.data.contacts.length > 0)
    if (page > 0)
      setContacts([...contacts, ...result.data.contacts]);
    else
      setContacts(result.data.contacts);
  }
  const handleChange = debounce((event) => {
    setInput(event.target.value)
  }, 500);

  const loadMore = () => {
    setPage(page + 1);
  }
  useEffect(() => {
    setContacts([])
    setPage(0);
  }, [input]);

  useEffect(() => {
    getContacts({ Input: input, Page: page }, getContactsHandle);
  }, [input, page, dataHasChanged]);
  return (
    <div>
      <div className='contactSearch'>
        <input placeholder='Search a contact...' onChange={handleChange}></input>
      </div>
      <ContactList contacts={contacts} popupController={popupController} hasMore={hasMore} loadMore={loadMore}></ContactList>
    </div>
  )
}
export default ContactSearch