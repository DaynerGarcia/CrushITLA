import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return alert('Por favor, completa todos los campos.');
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/'); // Redirige al índice después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        {isLoading && <LoadingSpinner />}
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">Iniciar Sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition duration-300"
        >
          Iniciar Sesión
        </button>
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>No tienes cuenta? <a href="/register" className="text-pink-600 hover:underline">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
