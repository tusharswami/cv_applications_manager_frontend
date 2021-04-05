import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';
import { withRouter, useRouter } from 'next/router';
import { signup } from '../../../../actions/auth';
import Link from 'next/link'
import SignupComponent from '../../../../components/auth/SignupComponent';

const ActivateAccount = () => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    });
    const router = useRouter();
    const { name, token, error, loading, success, showButton } = values;

    useEffect(() => {
        let token = router.query.token;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({ ...values, name, token });
        }
    }, [router]);

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        signup({ token }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false, showButton: false });
            } else {
                setValues({ ...values, loading: false, success: true, showButton: false });
            }
        });
    };

    const showLoading = () => (loading ? <h2>Loading...</h2> : '');

    return (
        <Layout>
            <main>
                <div class="bg_color_2">
                    <div class="container margin_60_35">
                        <div id="login-2">
                            <h3 className="pb-4 text-center" style={{ color: '#fff' }}>Congrats! {name},<br/>  Your account is succesfully Activated</h3>
                            {showLoading()}
                            <div className="text-center">
                            {error && error}
                            </div>
                            {success && 
                                <div>
                                    You have successfully activated your account.
                                    <Link href="/signin">Please signin.</Link>
                                </div>
                            }
                            {showButton && (
                            <div align="center">
                               <button className="btn_1" onClick={clickSubmit}>
                                    Get Started
                                </button>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default withRouter(ActivateAccount);
