
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



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/donorRegistration' element={<BloodDonorRegistration />}></Route>
        <Route path='/aboutUs' element={<AboutUs />}></Route>

        <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}>
          <Route index element={<Analytics />}></Route>
          <Route path='donor-list' element={<DonorList />}></Route>
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
