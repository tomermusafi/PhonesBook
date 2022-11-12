import axios from 'axios';
import { createContactQuery, updateContactQuery, deleteContactQuery, getContactsQuery } from './contactQueris'
import { BASE_URL } from '../../config'

export const createContact = async (data, callback) => {
  await axios({
    url: BASE_URL,
    method: 'post',
    data: {
      query: createContactQuery(data.FirstName, data.LastName, data.Nickname, data.Address)
    }
  })
    .then(res => {
      callback(res.data)
    })
    .catch(error => {
      callback(error)
      console.log(error);
    });
};

export const updateContact = async (data, callback) => {
  await axios({
    url: BASE_URL,
    method: 'post',
    data: {
      query: updateContactQuery(data.ContactId, data.FirstName, data.LastName, data.Nickname, data.Address)
    }
  }).then(res => {
    callback(res.data)
  }).catch(error => {
    callback(error)
    console.log(error);
  });
};


export const deleteContact = async (data, callback) => {
  await axios({
    url: BASE_URL,
    method: 'post',
    data: {
      query: deleteContactQuery(data.Id)
    }
  }).then(res => {
    callback(res.data)
  }).catch(error => {
    callback(error)
    console.log(error);
  });
};

export const getContacts = async (data, callback) => {
  await axios({
    url: BASE_URL,
    method: 'post',
    data: {
      query: getContactsQuery(data.Input, data.Page)
    }
  }).then(res => {
    callback(res.data)
  }).catch(error => {
    callback(error)
    console.log(error);
  });
};