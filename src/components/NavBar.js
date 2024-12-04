import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoadingSpinner from './LoadingSpinner';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpieza al desmontar el componente
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Oculta el spinner después de 3 segundos
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold text-yellow-300 hover:text-yellow-400">
          ITLA Crush
        </Link>
        <div className="flex space-x-6">
          {user ? (
            <>
              <Link to="/love" className="text-white hover:text-yellow-400 transition duration-300">
                Confesar Amor
              </Link>
              <Link to="/private" className="text-white hover:text-yellow-400 transition duration-300">
                Privado
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-yellow-400 focus:outline-none transition duration-300"
              >
                Cerrar Sesión
              </button>
              {isLoading && <LoadingSpinner />}
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-yellow-400 transition duration-300">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="text-white hover:text-yellow-400 transition duration-300">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
