import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Register />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
