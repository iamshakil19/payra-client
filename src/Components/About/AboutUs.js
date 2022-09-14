import React from 'react';
import Header from '../Header/Header';
import PageTitle from '../Shared/PageTitle';


const AboutUs = () => {
    return (
        <div>
            <Header/>
            <PageTitle title={"About"}></PageTitle>
            <div>
                <h2>This is about us</h2>
            </div>
        </div>
    );
};

export default AboutUs;