import Layout from '../../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router'
import CommentBox from '../../components/application/comment/CommentBox'
const RegisterComplaint = () => {
    const router = useRouter();

    const head = () => (
        <Head>
            <title>
                Comments for Application with {`${router.query.email}`} | GeoSpoc
            </title>
        </Head>
    );
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                <CommentBox email={`${router.query.email}`}/>
                    {/* <div class="container margin_60_35">
                        <div class="row justify-content-center">
                            <div class="col-lg-12">
                                <div class="box_general_3 write_review booking">
                                    <div className="title" style={{position: "sticky", top: "0px", zIndex : 1000}}>
                                    <h3 className="text-center">
                                        Complaint/Support Ticket
                                    </h3>
                                    </div>
                                    <hr/>
                                    
                                </div>
                            </div>
                        </div>
                    </div> */}
                </main>
            </Layout>
        </React.Fragment>
    );
}

export default RegisterComplaint;