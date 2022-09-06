
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import BloodDonorRegistration from './Components/BloodDonorRegistration/BloodDonorRegistration';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login/Login';
import Contact from './Components/Contact/Contact';
import AboutUs from './Components/About/AboutUs';
import NotFound from './Components/NotFound/NotFound';

import SignUp from './Components/SignUp/SignUp';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Analytics from './Components/DashboardGroup/Analytics/Analytics';
import Dashboard from './Components/DashboardGroup/Dashboard/Dashboard';
import DonorList from './Components/DashboardGroup/DonorList/DonorList';
import DonorRequest from './Components/DashboardGroup/DonorRequest/DonorRequest';
import BloodRequest from './Components/DashboardGroup/BloodRequest/BloodRequest';
import AllUser from './Components/DashboardGroup/AllUser/AllUser';
import AllAdmin from './Components/DashboardGroup/AllAdmin/AllAdmin';
import CompleteBloodRequest from './Components/DashboardGroup/BloodRequest/CompleteBloodRequest/CompleteBloodRequest';
import IncompleteBloodRequest from './Components/DashboardGroup/BloodRequest/IncompleteBloodRequest/IncompleteBloodRequest';
import Profile from './Components/Profile/Profile';
import RequireAdmin from './Components/ProtectedRoute/RequireAdmin';
import useAdmin from './Components/Hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';






function App() {

  // const [user] = useAuthState(auth);
  // const [admin] = useAdmin(user)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/donorRegistration' element={<BloodDonorRegistration />}></Route>
        <Route path='/aboutUs' element={<AboutUs />}></Route>
        <Route path='/profile' element={<Profile />}></Route>

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Analytics />}></Route>
          <Route path='donor-list' element={<DonorList />}></Route>
          <Route path='donor-request' element={<DonorRequest />}></Route>

          <Route path='blood-request' element={<BloodRequest />}>
            <Route index element={<CompleteBloodRequest />}></Route>
            <Route path='incomplete-blood-request' element={<IncompleteBloodRequest />}></Route>
          </Route>

          <Route path='user-list' element={<AllUser />}></Route>
          <Route path='admin-list' element={<AllAdmin />}></Route>
        </Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/registration' element={<SignUp />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
