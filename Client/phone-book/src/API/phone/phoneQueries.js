export const createPhoneQuery = (phoneNumber, contactId) => {
    return `mutation{
      createPhone(createPhoneInput:{
        Phone:"${phoneNumber}"
        ContactId: ${contactId}
      }){
        Id
      }
    }`;
}
export const updatePhoneQuery = (id, phoneNumber) => {
    return `mutation{
      updatePhone(updatePhoneInput:{
        Id: ${id}
        Phone: "${phoneNumber}"
      }){
        Phone
      }
    }`;
}
export const deletePhoneQuery = (id) => {
    return `mutation{
      removePhone(id:${id}){
        Phone
      }
    }`;
}