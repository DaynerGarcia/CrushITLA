import React, { useState } from 'react';
import { auth, firestore } from '../firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      return alert('Por favor, completa todos los campos.');
    }

    setIsLoading(true);
    try {
      // Crear el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario con displayName
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });

      // Guardar los datos del usuario en Firestore
      await addDoc(collection(firestore, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        email,
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 3000); // Redirige después de 3 segundos
    } catch (error) {
      console.error('Error al registrar:', error);
      setIsLoading(false);
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      {isLoading && <LoadingSpinner />}
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Crear Cuenta</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded"
      >
        Registrarse
      </button>
    </div>
  );
};

export default Register;
