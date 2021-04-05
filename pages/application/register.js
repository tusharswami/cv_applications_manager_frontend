import Layout from '../../components/Layout';
import Head from 'next/head';
import ApplicationRegistrationForm from '../../components/application/ApplicationRegistrationForm'
import Link from 'next/link';

const SubmitApplication = () => {
    const head = () => (
        <Head>
            <title>
                Submit Application
            </title>
        </Head>
    );
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div class="container margin_60_35">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="box_general_3 write_review booking">
                                    <div className="title">
                                    <h3 className="text-center">
                                        Submit Application
                                    </h3>
                                    </div>
                                    <hr/>
                                    <ApplicationRegistrationForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

export default SubmitApplication;
