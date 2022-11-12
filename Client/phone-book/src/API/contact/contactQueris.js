export const createContactQuery = (FirstName, LastName, Nickname, Address) => {
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
export const updateContactQuery = (contactId, FirstName, LastName, Nickname, Address) => {
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
export const deleteContactQuery = (contactId) => {
  return `mutation{
      removeContact(id:${contactId}){
        Name
      }
    }`;
}
export const getContactsQuery = (input, page) => {
  return `query{
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
        Id
        Phone
      }
    }
  }`;
}
