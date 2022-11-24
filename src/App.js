
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import BloodDonorRegistration from './Components/BloodDonorRegistration/BloodDonorRegistration';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login/Login';
import AboutUs from './Components/About/AboutUs';
import NotFound from './Components/NotFound/NotFound';
import SignUp from './Components/SignUp/SignUp';
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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import RequireAdmin from './Components/ProtectedRoute/RequireAdmin';
import AddContact from './Components/DashboardGroup/AddContact/AddContact';
import FrontEndContact from './Components/Contact/FrontEndContact';
import AvailableDonor from './Components/DashboardGroup/DonorList/AvailableDonors/AvailableDonor';
import UnavailableDonor from './Components/DashboardGroup/DonorList/UnavailableDonors/UnavailableDonor';
import Settings from './Components/DashboardGroup/Settings/Settings';
import Address from './Components/DashboardGroup/Address/Address';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/contact' element={<FrontEndContact />}></Route>

        <Route path='/donorRegistration' element={<BloodDonorRegistration />}></Route>
        <Route path='/aboutUs' element={<AboutUs />}></Route>
        <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>}></Route>

        <Route path='/dashboard' element={<RequireAdmin> <Dashboard /> </RequireAdmin>}>
          <Route index element={<Analytics />}></Route>

          <Route path='donor-list' element={<DonorList />}>
            <Route index element={<AvailableDonor />}></Route>
            <Route path='unavailableDonor' element={<UnavailableDonor />}></Route>
          </Route>

          <Route path='donor-request' element={<DonorRequest />}></Route>

          <Route path='blood-request' element={<BloodRequest />}>
            <Route index element={<CompleteBloodRequest />}></Route>
            <Route path='incomplete-blood-request' element={<IncompleteBloodRequest />}></Route>
          </Route>

          <Route path='add-contact' element={<AddContact />}></Route>
          <Route path='user-list' element={<AllUser />}></Route>
          <Route path='admin-list' element={<AllAdmin />}></Route>
          <Route path='address' element={<Address />}></Route>
          <Route path='settings' element={<Settings />}></Route>
        </Route>

        <Route path='/leaderBoard' element={<LeaderBoard />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/registration' element={<SignUp />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
