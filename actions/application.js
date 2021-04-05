import fetch from 'isomorphic-fetch';
import { ApplicationApi } from '../config';

export const preRegisterApplication = form => {
    console.log(form)
    return fetch(`${ApplicationApi}/pre-register`, {
        method: 'POST',
        headers: {
        },
        body: form
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const registerApplication = (invoiceNumber, secretCode) => {
    console.log(invoiceNumber+ " " + secretCode)
    // let requestBody = {
    //     invoiceNumber: invoiceNumber,
    //     secretCode: secretCode
    // }

    // console.log(requestBody +  ' Request Body')
    return fetch(`${ApplicationApi}/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            invoiceNumber,
            secretCode
        })
     })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getFilteredApplications = (requestBody) => {
    // let requestBody = {priority : "5"}
    return fetch(`${ApplicationApi}/get`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(requestBody)
     })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
