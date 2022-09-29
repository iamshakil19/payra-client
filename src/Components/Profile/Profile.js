import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Header from '../Header/Header';
import Footer from '../Shared/Footer/Footer';
import Loading from '../Shared/Loading/Loading';
import PageTitle from '../Shared/PageTitle';

const Profile = () => {

    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loading/>
    }
    return (
        <div>
            <Header />
            <PageTitle title={"Profile"}></PageTitle>

            <div className='bg-[#F5F7FF] py-20'>
                <h2 className='text-center py-5 text-3xl text-slate-400 font-bold poppins-font'> Hey <span className='text-green-500'>{user?.displayName} 👏</span> Welcome To Our Blood Donation Website</h2>
                <p className='text-slate-400 font-bold poppins-font text-center text-xl'>Very soon we will bring some new features, Stay tuned</p>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;