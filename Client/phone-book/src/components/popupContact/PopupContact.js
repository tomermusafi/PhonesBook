import React, { useRef } from 'react'
import './PopupContact.css'
import axios from 'axios';

function PopupContact({show, popupController, methodType, contact, dataHasChanged, setDataHasChanged}){
    const prevImgRef = useRef();
    const phoneList = useRef();
    const photoRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const nicknameRef = useRef();
    const addressRef = useRef();
    const saveResultMessageRef = useRef();
    const showValue = methodType == "UPDATE";
    const URL = `http://localhost:3333/graphql`;

    const createContactQuery = (FirstName, LastName, Nickname, Address) => {
      return `mutation{
        createContact(createContactInput:{
          FirstName: "${FirstName}"
          LastName: "${LastName}"
          Nickname: "${Nickname}"
          Address: "${Address}"
        }){
          Id
        }
      }`;
    }
    const createPhoneQuery = (phoneNumber, contactId) =>{
      return `mutation{
        createPhone(createPhoneInput:{
          Phone:"${phoneNumber}"
          ContactId: ${contactId}
        }){
          Id
        }
      }`;
    }
    const updateContactQuery = (contactId, FirstName, LastName, Nickname, Address) =>{
      return `mutation{
        updateContact(updateContactInput:{
          Id: ${contactId}
          FirstName: "${FirstName}"
          LastName: "${LastName}"
          Nickname: "${Nickname}"
          Address: "${Address}"
          Photo:""
        }){
          Name
        }
      }`;
    }
    const deleteContactQuery = (contactId) =>{
      return `mutation{
        removeContact(id:${contactId}){
          Name
        }
      }`;
    }
    const onInputImgChange = (event) => {
      const [file] = event.target.files
      if (file) {
          prevImgRef.current.src = URL.createObjectURL(file)
      }
    }
    const removePhoneElement = (event) =>{
      event.target.parentNode.remove();
    }
    const addPhoneInput = () =>{
      const wrapper = document.createElement("div");
      wrapper.className ="phone"
      const minus = document.createElement("div");
      minus.innerHTML="x"
      minus.className ="minus";
      minus.addEventListener("click", removePhoneElement);
      const input = document.createElement("input");
      input.type = "tel";
      input.pattern = "[0-9]{3}-[0-9]{2}-[0-9]{3}";
      wrapper.appendChild(input)
      wrapper.appendChild(minus)

      phoneList.current.appendChild(wrapper);
    }
    const onContactSave = () =>{
      let FirstName = firstNameRef.current.value;
      let LastName = lastNameRef.current.value;
      let Nickname = nicknameRef.current.value;
      let Address = addressRef.current.value;
        axios({
          url: URL,
          method: 'post',
          data: {
            query: createContactQuery(FirstName, LastName, Nickname, Address)
          }
        }).then((result) => {
         const contactId = result.data.data.createContact.Id;
         if(contactId > 0){
              const phoneNunberList = Array.from(phoneList.current.children).map(child => child.children[0].value);
              for(let i = 0 ; i < phoneNunberList.length; i++){
                axios({
                  url: URL,
                  method: 'post',
                  data: {
                    query: createPhoneQuery(phoneNunberList[i], contactId)
                  }
                }).then((result) => {
                  const phoneId = result.data.data.createPhone.Id;
                  if(phoneId > 0 && i == phoneNunberList.length -1){
                    saveResultMessageRef.current.className = 'visible';
                    saveResultMessageRef.current.style.color = 'green';
                    saveResultMessageRef.current.innerHTML = 'Saved';
                    setTimeout(()=>{saveResultMessageRef.current.className = 'hidden';},1000);
                    setDataHasChanged(!dataHasChanged);
                  }
                }).catch((error)=>{
                    console.log(error);
                });
              }
                              
         }
        }).catch((error)=>{
          console.log(error);
        });
    }
    const onContactUpdate = () =>{
      let FirstName = firstNameRef.current.value;
      let LastName = lastNameRef.current.value;
      let Nickname = nicknameRef.current.value;
      let Address = addressRef.current.value;
      axios({
        url: URL,
        method: 'post',
        data: {
          query: updateContactQuery(contact.Id, FirstName, LastName, Nickname, Address)
        }
      }).then((result) => {
        if(result.data.data == null || (result.data.errors != null && result.data.errors.length > 0)){
              saveResultMessageRef.current.className = 'visible';
              saveResultMessageRef.current.style.color = 'red';
              saveResultMessageRef.current.innerHTML = 'Faild to update';
              setTimeout(()=>{saveResultMessageRef.current.className = 'hidden';},1000);
        }
        else{
          popupController(false, "UPDATE");
          setDataHasChanged(!dataHasChanged);
        }
      }).catch((error) =>{
        console.log(error)
      })
    }
    const onContactDelete = () =>{
      axios({
        url: URL,
        method: 'post',
        data: {
          query: deleteContactQuery(contact.Id)
        }
      }).then((result) => {
        if(result.data.data == null || (result.data.errors != null && result.data.errors.length > 0)){
              saveResultMessageRef.current.className = 'visible';
              saveResultMessageRef.current.style.color = 'red';
              saveResultMessageRef.current.innerHTML = 'Faild to delete';
              setTimeout(()=>{saveResultMessageRef.current.className = 'hidden';},1000);
        }
        else{
          popupController(false, "UPDATE");
          setDataHasChanged(!dataHasChanged);
        }
      }).catch((error) =>{
        console.log(error)
      })
    }
    return(
        <>
        {show && (<div className='popup'>
            <div className='popup-inner'>
              <div className='closeBtn' onClick={() => popupController(false, "CREATE")}>X</div>
                <div className='fieldsWrapper'>
                <div ref={photoRef} className='field'>
                    <label>Photo</label>
                    <input type="file" onChange={onInputImgChange} accept="image/jpeg, image/png" />
                </div>
                <div className='field'>
                    <label>First Name:</label>
                    <input type="text" ref={firstNameRef} defaultValue={showValue ? contact.FirstName : ""}></input>
                </div>
                <div className='field'>
                <label>Last Name:</label>
                <input type="text" ref={lastNameRef} defaultValue={showValue? contact.LastName:""}></input>
                </div>
                <div className='field'>
                <label>Nickname:</label>
                <input type="text" ref={nicknameRef} defaultValue={showValue ? contact.Nickname: ""}></input>
                </div>
                <div className='field'>
                <label>Address:</label>
                <input type="text" ref={addressRef} defaultValue={showValue ? contact.Address:""}></input>
                </div>
                <div className='phones field'>
                    <label>Phones:</label>
                    <div ref={phoneList} >
                      <div className='phone'>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
                        defaultValue={(showValue && 
                        contact != null &&
                        contact.getContactPhones != null && 
                        contact.getContactPhones.length > 0) ?
                        contact.getContactPhones[0].Phone : ""}>
                        </input>
                      </div>
                      { contact != null && contact.getContactPhones != null && 
                        contact.getContactPhones.length > 0 &&(contact.getContactPhones.map(c => {
                          <div className='phone'>
                            <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
                        defaultValue={c.Phone}></input>
                        <div className='minus' onClick={removePhoneElement}>x</div>
                          </div>
                        }) )}
                        
                    </div>
                    <div className='add' onClick={addPhoneInput}>+ Add another phone</div>
                </div>
                {!showValue ? (<button onClick={onContactSave}>Save</button>) :  (
                  <div>
                    <button onClick={onContactUpdate}>Update</button>
                    <button onClick={onContactDelete}>Delete</button>
                  </div>
                )}
                <label ref={saveResultMessageRef} className='saveResultMessage'></label>
                </div>
            </div>
        </div>)}
        </>
    )
}
export default PopupContact