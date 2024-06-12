import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold text-white mb-4">404</div>
      <h1 className="text-2xl text-white font-bold mb-2">You have found a secret place.</h1>
      <p className="text-white text-lg text-center mb-6">
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
      </p>
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Take me back to home page
      </button>
    </div>
  );
}

export default ErrorPage;
