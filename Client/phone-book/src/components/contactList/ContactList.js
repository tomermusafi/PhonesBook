import React, { useRef, useState } from 'react'
import './ContactList.css'
import Contact from '../contact/Contact'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetchContact from './contactAPIHandler'

function ContactList({contacts, loading}){

    const [con, setCon] = useState(contacts);
    return (
        <InfiniteScroll
        dataLength={5}
        next={fetchContact("",0,setCon())}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
        <div className='contactList'>
    {con && con.length > 0 && (
                <div className="contacts">
                    {con.map(contact => (
                        <Contact contact={contact} key={contact.Id}></Contact>
                    ))}
                </div>
            )}
        </div>
        </InfiniteScroll>
    )

    // return(
    //     <div className='contactList'>
    //        {contacts && contacts.length > 0 && (
    //             <div className="contacts">
    //                 {contacts.map(contact => (
    //                     <Contact contact={contact} key={contact.Id}></Contact>
    //                 ))}
    //             </div>
    //         )}
    //     </div>
    // )
}
export default ContactList