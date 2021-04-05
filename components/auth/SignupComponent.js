import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from '../auth/LoginGoogle'

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        mobile : '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, mobile, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password, mobile };

        preSignup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    mobile : '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <div class="box_form clearfix">
                <form onSubmit={handleSubmit}>
                    {/* <div class="box_login">
                         */}
                        {/* <a href="#0" class="social_bt facebook">Login with Facebook</a>
                        <a href="#0" class="social_bt linkedin">Login with Linkedin</a> */}
                    {/* </div> */}
                    <div class="box_login" style={{width : "100%"}}>
                        {/* <LoginGoogle /> */}
                        {/* <hr/> */}
                        <div className="form-group">
                            <input
                                value={name}
                                onChange={handleChange('name')}
                                type="text"
                                className="form-control"
                                placeholder="Type your name"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                value={email}
                                onChange={handleChange('email')}
                                type="email"
                                className="form-control"
                                placeholder="Type your email"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                value={mobile}
                                onChange={handleChange('mobile')}
                                type="text"
                                className="form-control"
                                placeholder="Type your Mobile"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                value={password}
                                onChange={handleChange('password')}
                                type="password"
                                className="form-control"
                                placeholder="Type your password"
                            />
                        </div>

                        <div>
                            <button className="btn_1">Signup</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>
    );
};

export default SignupComponent;
