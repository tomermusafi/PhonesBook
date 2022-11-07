import { Contact } from "../entities/contact.entity";

export default function convertContactName(contact: Contact): Contact{

    let name = "";
    if(contact.Nickname != null && contact.Nickname.length > 0){
        contact.Name = contact.Nickname;
    }
    else{
      if(contact.FirstName != null && contact.FirstName.length > 0 ){
        name += contact.FirstName;
      }
      if(contact.LastName != null && contact.LastName.length > 0){
        if(name.length > 0){
          name += " ";
        }
        name += contact.LastName;
      }
      if(name.length == 0){
        name = "Anonymous";
      }
      contact.Name = name;
    }
    return contact;
}