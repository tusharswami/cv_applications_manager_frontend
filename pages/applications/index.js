import Layout from '../../components/Layout';
import Head from 'next/head';
import Private from '../../components/auth/Private';
import GetAllApplicationsCards from '../../components/application/GetAllApplicationsCards'

const allComplaints = () => {
    const head = () => (
        <Head>
            <title>
                All Complaints | GeoSpoc Pvt Ltd
            </title>
        </Head>
    );
    return (
        <React.Fragment>
            {head()}
            <Private>
            <Layout>
                <GetAllApplicationsCards />
            </Layout>
            </Private>
        </React.Fragment>
    )
}

export default allComplaints;