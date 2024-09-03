import './App.css'
import MeetingForm from "./components/Meeting-component/Meeting";
import NavBar from "./components/Nav-component/Nav";
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import MemberComponent from "./components/Member-component/Member";
import AboutPage from "./components/About-component/AboutPage";
import Home from './components/Home-component/Home';
import LoginForm from './components/Login-form/Login';
import RegisterForm from './components/Registration-form/RegisterFormComponent';

function App() {

  return (
      <div >
        <Router>
          <NavBar/>
          
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path = "/MeetingForm" element = {<MeetingForm/>}></Route>
            <Route path = "/MemberComponent" element={<MemberComponent/>}></Route>
            <Route path = "/AboutPage" element={<AboutPage/>}></Route>
            <Route path = "/LoginForm" element={<LoginForm/>}></Route>

            <Route path="/RegisterForm" element={<RegisterForm/>}></Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
