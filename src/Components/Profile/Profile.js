import React from 'react';
import Header from '../Header/Header';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';

const Profile = () => {
    return (
        <div>
            <Header/>
            <PageTitle title={"Profile"}></PageTitle>
            <h2>This Is User Profile Page</h2>

            <Footer/>
        </div>
    );
};

export default Profile;