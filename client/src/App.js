import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import About from './pages/About/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
