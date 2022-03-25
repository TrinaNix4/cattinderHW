import logo from './logo.svg';
import './App.css';
import Navbar from './components/shared/NavBar';
import { Routes, Route} from 'react-router-dom';
import Home from './components/shared/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NoMatch from './components/shared/NoMatch';

function App() {
  return (
    <div>
      <Navbar />
      <>
       <Routes>
       {/* unprotected */}
       <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
          
        <Route element={<ProtectedRoute/>}>
         <Route path='/' element={<Home />}/>
         
         </Route>
         <Route path='*' element={<NoMatch />}/>
       </Routes>
      </>
    </div>
  );
}

export default App;
