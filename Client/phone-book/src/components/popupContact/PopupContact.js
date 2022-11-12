import React, { useRef, useState } from 'react'
import './PopupContact.css'
import PhoneField from '../phoneField/PhoneField';
import TextField from '../textField/TextField';
import { createContact, updateContact, deleteContact } from '../../API/contact/contactAPIHandler'
import { createPhone, DeletePhone, updatePhone } from '../../API/phone/phoneAPIHandler'

function PopupContact({ show, popupController, methodType, contact, dataHasChanged, setDataHasChanged }) {
  const prevImgRef = useRef();
  const phoneListRef = useRef();
  const photoRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const nicknameRef = useRef();
  const addressRef = useRef();
  const saveResultMessageRef = useRef();
  const showValue = methodType == "UPDATE";
  const [phonesToDelete, setPhonesToDelete] = useState([]);

  /*phone actions*/
  const handleCreatePhone = (result) => {
    const phoneId = result.data.createPhone.Id;
    if (phoneId > 0) {
      handleResultMessage('green', 'Saved');
      setTimeout(setDataHasChanged(!dataHasChanged), 1000);
    }
  }
  const handleDeletedPhones = (id) => {
    phonesToDelete.push(id);
    setPhonesToDelete(phonesToDelete);
  }
  const handleDeletePhone = (result) => {
    if (result.data == null || (result.errors != null && result.errors.length > 0)) {
      handleResultMessage('red', 'Faild to update');
    }
    else {
      popupController(false, "UPDATE");
      setTimeout(setDataHasChanged(!dataHasChanged), 1000);
    }
  }
  const handleUpdatePhone = (result) => {
    if (result.data == null || (result.errors != null && result.errors.length > 0)) {
      handleResultMessage('red', 'Faild to update');
    }
    else {
      popupController(false, "UPDATE");
      setTimeout(setDataHasChanged(!dataHasChanged), 1000);
    }
  }
  const deletePhones = () => {
    if (phonesToDelete.length > 0) {
      phonesToDelete.map(id => {
        DeletePhone({ Id: id }, handleDeletePhone);
      })
      setPhonesToDelete([]);
    }
  }
  const updatePhoneNumber = (id, phoneNumber) => {
    if (id < 0) {
      createPhone({ PhoneNumber: phoneNumber, ContactId: contact.Id }, handleCreatePhone);
    }
    else {
      updatePhone({ Id: id, PhoneNumber: phoneNumber }, handleUpdatePhone);
    }
  }

  /*contact actions*/
  const handleCreateContact = (result) => {
    const contactId = result.data.createContact.Id;
    if (contactId > 0) {
      const phoneNumberList = Array.from(phoneListRef.current.children).map(child => child.children[0].value);
      for (let i = 0; i < phoneNumberList.length; i++) {
        const data = {
          PhoneNumber: phoneNumberList[i],
          ContactId: contactId
        };
        createPhone(data, handleCreatePhone);
      }
    }
  }
  const handleUpdateContact = (result) => {
    if (result.data == null || (result.errors != null && result.errors.length > 0)) {
      handleResultMessage('red', 'Faild to update');
    }
    else {
      popupController(false, "UPDATE");
      setTimeout(setDataHasChanged(!dataHasChanged), 1000);
    }
  }
  const handleDeleteContact = (result) => {
    if (result.data == null || (result.errors != null && result.errors.length > 0)) {
      handleResultMessage('red', 'Faild to delete');
    }
    else {
      popupController(false, "UPDATE");
      setTimeout(setDataHasChanged(!dataHasChanged), 1000);
    }
  }
  const onContactSave = () => {
    const data = {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Nickname: nicknameRef.current.value,
      Address: addressRef.current.value
    }
    createContact(data, handleCreateContact);
  }
  const onContactUpdate = () => {
    deletePhones();
    Array.from(phoneListRef.current.children).map(child => {
      return [parseInt(child.children[0].id != null && child.children[0].id.length > 0 ? child.children[0].id : -1), child.children[0].value]
    }).map(phone => {
      updatePhoneNumber(phone[0], phone[1]);
    });
    const data = {
      ContactId: contact.Id,
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Nickname: nicknameRef.current.value,
      Address: addressRef.current.value
    }
    updateContact(data, handleUpdateContact);
  }
  const onContactDelete = () => {
    deleteContact({ Id: contact.Id }, handleDeleteContact);
  }


  const onInputImgChange = (event) => {
    const [file] = event.target.files
    if (file) {
      prevImgRef.current.src = URL.createObjectURL(file)
    }
  }
  const removePhoneElement = (event) => {
    event.target.parentNode.remove();
  }
  const addPhoneInput = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "phone"
    const minus = document.createElement("div");
    minus.innerHTML = "x"
    minus.className = "minus";
    minus.addEventListener("click", removePhoneElement);
    const input = document.createElement("input");
    input.type = "tel";
    input.pattern = "[0-9]{3}-[0-9]{2}-[0-9]{3}";
    wrapper.appendChild(input)
    wrapper.appendChild(minus)

    phoneListRef.current.appendChild(wrapper);
  }
  // display a message after finish an action
  const handleResultMessage = (color, text) => {
    saveResultMessageRef.current.className = 'visible';
    saveResultMessageRef.current.style.color = color;
    saveResultMessageRef.current.innerHTML = text;
  }
  return (
    <>
      {show && (<div className='popup'>
        <div className='popup-inner'>
          <div className='closeBtn' onClick={() => popupController(false, "CREATE")}>X</div>
          <div className='fieldsWrapper'>
            <div ref={photoRef} className='field'>
              <label>Photo</label>
              <input type="file" onChange={onInputImgChange} accept="image/jpeg, image/png" />
            </div>
            <TextField label={"First Name:"} defaultValue={showValue ? contact.FirstName : ""} reference={firstNameRef}></TextField>
            <TextField label={"Last Name:"} defaultValue={showValue ? contact.LastName : ""} reference={lastNameRef}></TextField>
            <TextField label={"Nickname:"} defaultValue={showValue ? contact.Nickname : ""} reference={nicknameRef}></TextField>
            <TextField label={"Address:"} defaultValue={showValue ? contact.Address : ""} reference={addressRef}></TextField>
            <div className='phones field'>
              <label>Phones:</label>
              <div ref={phoneListRef} >
                <PhoneField contact={contact} removable={false} showValue={showValue}></PhoneField>
                {contact != null && contact.getContactPhones != null &&
                  contact.getContactPhones.length > 0 && (contact.getContactPhones.slice(1).map((p, key) => (
                    <PhoneField key={key} contact={contact} phone={p} showValue={showValue} removable={true} handleDeletedPhones={handleDeletedPhones}></PhoneField>
                  )))}
              </div>
              <div className='add' onClick={addPhoneInput}>+ Add another phone</div>
            </div>
            {!showValue ? (<button onClick={onContactSave}>Save</button>) : (
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