import {useState} from 'react';
import {registerWarranty} from '../../actions/application';
const ApplicationSuccess = ({values}) => {
    let {mobile, email} = values;
    return (
            <div id="confirm">
                <div class="icon icon--order-success svg add_bottom_15">
                    <img src="https://media1.tenor.com/images/810b7ef09946e9d371d6a780a3525ca6/tenor.gif?itemid=15266923" alt="Success Image" width="200"/>
                </div>
                <h3>Thanks for registering Application with Geospoc!</h3>
                <p>You'll receive a confirmation at <span>{email}</span> and <span>{mobile}</span></p>
            </div>
    )
}

export default ApplicationSuccess;