import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const sendSMS = (data) => {
    console.log(data) 
    return fetch(`${API}/sms`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            phone: data.smsRecipient,
            message: data.smsContent,
            subject : `ARCTRN`
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
