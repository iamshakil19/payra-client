import React from 'react';
import Header from '../Header/Header';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';

const Profile = () => {
    return (
        <div>
            <Header />
            <PageTitle title={"Profile"}></PageTitle>

            <div>
                <h2 className='text-center py-5 text-3xl text-slate-400 font-bold poppins-font'>Coming Soon</h2>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;