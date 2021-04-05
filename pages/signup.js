import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            {/* <div className="container-fluid">
                <h2 className="text-center pt-4 pb-4">Signup</h2>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SignupComponent />
                    </div>
                </div>
            </div> */}
            <main>
		<div class="bg_color_2">
			<div class="container margin_60_35">
				<div id="login-2">
					<h1>Welcome to GeoSpoc Admin Portal</h1>
					<SignupComponent />
					<p class="text-center ">Already have an account!
                        <Link href="signin" >
                            <strong className="link_bright" style={{ cursor: 'pointer' }}> Login now!</strong>
                        </Link>
                    </p>
				</div>
				{/* <!-- /login --> */}
			</div>
		</div>
	</main>
        </Layout>
    );
};

export default Signup;
