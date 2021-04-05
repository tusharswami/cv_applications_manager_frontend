import Layout from '../../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router'
import ComplaintRegistrationForm from '../../components/complaint/ComplaintRegistrationForm'
const RegisterComplaint = () => {
    const router = useRouter();

    const head = () => (
        <Head>
            <title>
                Create a Complaint Ticket | GeoSpoc Pvt Ltd
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
                            <div class="col-lg-12">
                                <div class="box_general_3 write_review booking">
                                    <div className="title" style={{position: "sticky", top: "0px", zIndex : 1000}}>
                                    <h3 className="text-center">
                                        Complaint/Support Ticket
                                    </h3>
                                    </div>
                                    <hr/>
                                    <ComplaintRegistrationForm incrementId={router.query.increment_id} nameQ={router.query.nameQ} emailQ={router.query.emailQ} phoneQ={router.query.phoneQ}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
}

export default RegisterComplaint;