import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Register />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/dashboard" exact element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
