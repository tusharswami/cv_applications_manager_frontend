import Link from 'next/link';
import Router from 'next/router';
import {preRegisterApplication} from '../../actions/application';
import { useState, useEffect } from 'react';
import ApplicationSuccess from './ApplicationSuccess';
const ApplicatioRegistrationForm = () => {
    const [values, setValues] = useState({
        name : "",
        email : "",
        mobile : "",
        coverLetter : "",
        formData : '',
        likeWorking : true,
        termsAccepted : true,
        error : '',
        success : '',
        isApplicationSubmitted : false
    });
    const [isApplicationRegisterd, setIsApplicationRegistered] = useState(false)
    // let formData = new FormData()
    const {name, email, mobile, coverLetter, error, success, formData, isApplicationSubmitted, likeWorking, termsAccepted} = values;

    useEffect(() => {
        setValues({ ...values, formData : new FormData() });
    }, [])

    const registerApplication = e => {
        e.preventDefault();
        console.log(formData);
        preRegisterApplication(formData).then(data => {
            if (data.error) {
                setValues({ ...values,name : '', email : '', mobile : '', coverLetter: '', formData: '', error: data.error });
            } else {
                if(!data.err){
                    console.log(data)
                    setValues({ ...values, error: '', success: data.msg, isApplicationSubmitted : true });
                }else{
                    console.log(data)
                    setValues({ ...values, error: data.err, isApplicationSubmitted : false });
                }
                

            }
        });
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        console.log(name)
        console.log(formData)
        const value = name === 'popUrl' ? e.target.files[0] : e.target.value;
        console.log(name, value)
        formData.set(name, value);
        formData.set("termsAccepted", termsAccepted);
        formData.set("likeWorking", likeWorking);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createRegistrationForm = () => {
        return (
            <form onSubmit={registerApplication} enc-type='multipart/form-data'>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange('name')} required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" className="form-control" value={email} onChange={handleChange('email')} required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Mobile</label>
                    <input type="text" className="form-control" value={mobile} onChange={handleChange('mobile')} required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Cover Letter</label>
                    <textarea type="text" className="form-control" value={coverLetter} onChange={handleChange('coverLetter')} required></textarea>
                </div>
                <div className="form-group">
                    <label className="text-muted">Upload your CV</label>
                    <div className="fileupload">
                        <input onChange={handleChange('popUrl')} type="file" required/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="text-muted">Do you like working?</label>
                    <div className="switch-field">
							<input type="radio" id="no" name="status" value="no" />
							<label htmlFor="no">No</label>
							<input  type="radio" id="yes" name="status" value="yes" selected/>
							<label htmlFor="yes">Yes</label>
						</div>    
                </div>
                <hr/>
                <div class="form-group">
                    <div class="checkboxes add_bottom_30 add_top_15">
                        <label class="container_check">I accept <a href="#0">terms and conditions and general policy</a>
                            <input type="checkbox" required/>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn_1">
                        Register
                    </button>
                </div>
            </form>
        );
    };

    return(
        <div className='col-lg-12'>
            {showError()}
            {showSuccess()}
            {!isApplicationSubmitted && (
                <div>
                    {createRegistrationForm()}
                    {/* <h1>Registration Form</h1> */}
                </div>
            )}
            {isApplicationSubmitted && (
                <ApplicationSuccess values={values}/>
            )}
        </div>
    )
}

export default ApplicatioRegistrationForm;