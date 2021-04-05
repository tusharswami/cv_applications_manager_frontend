import fetch from 'isomorphic-fetch';
import { ApplicationApi, API } from '../config';

export const registerComplaint = ({name, phone, email, subject, message, priority, orderId, concernedAgent}) => {
    // console.log(complaintBody)
    let requestBody = {
        name : name,
        subject : subject,
        message : message,
        priority : priority,
        phone : phone,
        email : email,
        orderId : orderId,
        concernedAgent : concernedAgent
    }
    return fetch(`${ApplicationApi}/new`, {
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

export const markAsResolvedAction = ({complaintIdParam, toStatus}) => {
    console.log(complaintIdParam)
    console.log(toStatus)
    return fetch(`${ApplicationApi}/status/change/${toStatus}/${complaintIdParam}`, {
        method: 'GET'
     })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const submitNewCommentAction = (requestBody) => {
    console.log("Action", requestBody)
    return fetch(`${ApplicationApi}/comment/new`, {
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

export const getAllAgentsAction = token => {
    // console.log("Action Get All Agents", token)
    return fetch(`${API}/user/get/all`, {
        method: 'GET',  
        headers: {
            Accept : 'application/json',
            Authorization: `Bearer ${token}`
        }
     })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const updateConcernedAgentAction = (agentToChange, complaintIdForChangingAgent) => {
    // console.log("Action Get All Agents", token)
    return fetch(`${ApplicationApi}/agent/change/${agentToChange}/${complaintIdForChangingAgent}`, {
        method: 'GET',  
        headers: {
            Accept : 'application/json',
            // Authorization: `Bearer ${token}`
        }
     })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


//Add a Comment with File
export const addCommentAction = form => {
    console.log(form)
    return fetch(`${ApplicationApi}/comment/new`, {
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

//Fetch Comment By ID
export const fetchCommentsByIdAction = (email) => {
    console.log(email)
    return fetch(`${ApplicationApi}/${email}/comments/get`, {
        method: 'GET',
        headers: {
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};