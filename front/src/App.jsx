import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { Authprovider } from './Context/AuthContext';
import ProfilePage from './Pages/ProfilePage';
import ErrorPage from './Pages/404Page';

function App() {

  return (
    <Authprovider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/404' element={<ErrorPage/>} />
        {/* Ruta comodín para manejar URLs no encontradas */}
      <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
    </Authprovider>
  );
}

export default App;
