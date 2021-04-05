import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 font-weight-bold">
                                Welcome to The Application
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pt-4 pb-5">
                            <p className="lead">
                            “It's not what you achieve, it's what you overcome. That's what defines your career." <br/>—Carlton Fisk
                            </p>
                            <Link href="/application/register">
                                <button className="text text-center">
                                    Submit
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </article>
        </Layout>
    );
};

export default Index;
