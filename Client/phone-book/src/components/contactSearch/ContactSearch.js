import React, { useState, useEffect} from 'react'
import {debounce} from 'lodash'
import axios from 'axios'
import './ContactSearch.css'
import Contact from '../contact/Contact'
function ContactSearch({popupController, dataHasChanged}){

    const [input, setInput] = useState("");
    const [page, setPage] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const handleChange = debounce((event) => {
        setInput(event.target.value)
    }, 500);
    const loadMore =() =>{
      setPage(page + 1);
    }
    useEffect(() => {
      debugger;
      setContacts([])
      setPage(0);
    }, [input])
    useEffect(() =>{
        axios({
            url: 'http://localhost:3333/graphql',
            method: 'post',
            data: {
              query: `query{
                contacts(
                  input:"${input}"
                  take: 5
                  skip: ${page}
                ){
                  Nickname
                  Id
                  FirstName
                  LastName
                  Photo
                  Address
                  Name
                  getContactPhones{
                    Phone
                  }
                }
              }`
            }
          }).then((result) => {
            debugger;
            console.log(result.data)
            setHasMore(result.data.data.contacts.length > 0)
            if(page > 0)
              setContacts([...contacts,...result.data.data.contacts])
            else
            setContacts(result.data.data.contacts)
          }).catch(()=>{
            console.log("error");
          });
      },[input, page, dataHasChanged])
    return(
        <div>
            <div className='contactSearch'>  
                <input placeholder='Search a contact...'  onChange={handleChange}></input>
            </div>
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
        </div>
    )
}
export default ContactSearch