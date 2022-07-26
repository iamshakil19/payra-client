
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import RequestForBlood from './Components/RequestForBlood/RequestForBlood';
import BloodDonorRegistration from './Components/BloodDonorRegistration/BloodDonorRegistration';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/requestForBlood' element={<RequestForBlood/>}></Route>
        <Route path='/donorRegistration' element={<BloodDonorRegistration/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
