import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';

const CompleteProfile = () => {
    return (
            <div >
                <div id="breadcrumb">
                    <div class="container text-center">
                        <ul>
                            <li><a>You haven't Completed your Profile Yet...</a></li>
                            <li ><a href="#" className="btn_1">  Complete Now</a></li>
                        </ul>
                    </div>
                </div>
		{/* <!-- /breadcrumb --> */}
            </div>
    );
};

export default CompleteProfile;
