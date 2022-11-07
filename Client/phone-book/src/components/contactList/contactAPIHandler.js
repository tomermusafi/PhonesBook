import axios from "axios";
export default async function fetchContact(input, page, callback){
    axios({
        url: 'http://localhost:3000/graphql',
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
        console.log(result.data)
        callback(result.data.data.contacts)
      });
}