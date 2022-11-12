import axios from 'axios';
import { createPhoneQuery, deletePhoneQuery, updatePhoneQuery } from './phoneQueries'
import { BASE_URL } from '../../config'

export const createPhone = async (data, callback) => {
    await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: createPhoneQuery(data.PhoneNumber, data.ContactId)
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

export const updatePhone = async (data, callback) => {
    await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: updatePhoneQuery(data.Id, data.PhoneNumber)
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

export const DeletePhone = async (data, callback) => {
    await axios({
        url: BASE_URL,
        method: 'post',
        data: {
            query: deletePhoneQuery(data.Id)
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