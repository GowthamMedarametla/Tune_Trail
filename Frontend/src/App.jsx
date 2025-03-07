import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Addsong from './Admin/Addsong';
import Mysongs from './Admin/Mysongs';
import Favorites from './User/Favorites';
import Playlist from './User/Playlist';
import Home from './Components/Home';
import Login from './User/Login';
import Signup from './User/Signup';
import Alogin from './Admin/Alogin';
import Asignup from './Admin/Asignup';
import Asidebar from './Admin/Asidebar';
import Users from './Admin/Users';
import Songs from './User/Songs';

const App = () => {
  
  return (
    <div>

     <BrowserRouter>
     
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/addsong' element={<Addsong/>}/>
      <Route path='/alogin' element={<Alogin/>}/>
      <Route path='/asignup' element={<Asignup/>}/>
      <Route path='/asidebar' element={<Asidebar/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/mysongs' element={<Mysongs/>}/>
      

      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/songs' element={<Songs/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
      <Route path="/playlist" element={<Playlist/>} />
     </Routes>
     </BrowserRouter>

    </div>
  );
};

export default App;
