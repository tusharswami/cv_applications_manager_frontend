import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';
import { isAuth } from '../../actions/auth';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>{`Hi! There`}</h2>
                        </div>
                        
                        <div className="col-md-12">
                            <div className="col-lg-12">
                                <Link href="/applications">
                                    <button className="btn_1">
                                        Check all Applications
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;
