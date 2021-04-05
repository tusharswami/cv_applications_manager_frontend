import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Link from 'next/link';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
            <main>
		<div class="bg_color_2">
			<div class="container margin_60_35">
				<div id="login-2">
					<h1>Please login to GeoSpoc Portal!</h1>
					<SigninComponent />
					<p class="text-center ">Do not have an account yet? 
                        <Link href="signup" >
                            <strong className="link_bright" style={{ cursor: 'pointer' }}> Register now!</strong>
                        </Link>
                    </p>
				</div>
			</div>
		</div>
	</main>

        </Layout>
    );
};

export default withRouter(Signin);
