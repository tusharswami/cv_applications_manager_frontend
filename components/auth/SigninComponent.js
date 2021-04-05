import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'ryan@gmail.com',
        password: 'rrrrrr',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
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

    const signinForm = () => {
        return (
            <div class="box_form clearfix">
                <form onSubmit={handleSubmit}>
                    <div class="box_login">
                        <p>If you have already Signed up with a Gmail Google</p>
                        <p>Feel free to use Google Sign in Button</p>
                        <LoginGoogle />
                        {/* <a href="#0" class="social_bt facebook">Login with Facebook</a>
                        <a href="#0" class="social_bt linkedin">Login with Linkedin</a> */}
                    </div>
                    <div class="box_login last">
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
                                value={password}
                                onChange={handleChange('password')}
                                type="password"
                                className="form-control"
                                placeholder="Type your password"
                            />
                        </div>

                        <div class="form-group">
                            <button className="btn_1">Signin</button>
                            <Link href="/auth/password/forgot">
                                <small><a className="align_right">Forgot password</a></small>
                            </Link>
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
            {showForm && signinForm()}
            <br />
        </React.Fragment>
    );
};

export default SigninComponent;
