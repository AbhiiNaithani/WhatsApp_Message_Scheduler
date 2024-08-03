import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {Login} from './pages/Login';
import {Landing} from './pages/Landing';
import {Schedule} from './pages/Schedule';
import {AllSchedules} from './pages/AllSchedules';
import {PendingSchedules} from './pages/PendingSchedules';
import {CompletedSchedules} from './pages/CompletedSchedules';
import './App.css';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Navigate to='login'/>}/>
          <Route path='login' element = {<Login/>} />
          <Route path='landing' element = {<Landing/>} >
            <Route path='addSchedule' element = {<Schedule/>} />
            <Route path='allSchedules' element = {<AllSchedules/>} />
            <Route path='pendingSchedules' element = {<PendingSchedules/>} />
            <Route path='completedSchedules' element = {<CompletedSchedules/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
