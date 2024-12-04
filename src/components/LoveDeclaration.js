import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import LoadingSpinner from './LoadingSpinner';

const LoveDeclaration = () => {
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [users, setUsers] = useState([]);
  const [isOtherRecipient, setIsOtherRecipient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar usuarios al iniciar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async () => {
    if (!body || !recipient) {
      return alert('Por favor, escribe una declaración y selecciona un destinatario.');
    }

    setIsLoading(true);
    try {
      // Obtener el nombre del usuario actual o asignar "Anónimo" si no existe
      const authorName = auth.currentUser?.displayName || 'Anónimo';

      await addDoc(collection(firestore, 'declarations'), {
        body,
        recipient,
        author: isPublic ? authorName : 'Anónimo', // Solo muestra "Anónimo" si es privado
        isPublic,
        createdAt: new Date(),
      });
      setTimeout(() => {
        setIsLoading(false);
        setBody('');
        setRecipient('');
        setIsOtherRecipient(false);
      }, 3000); // Oculta el spinner después de 3 segundos
    } catch (error) {
      console.error('Error al enviar la declaración:', error);
      setIsLoading(false);
    }
  };

  // Manejar cambios en el destinatario
  const handleRecipientChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'OTRO') {
      setIsOtherRecipient(true);
      setRecipient('');
    } else {
      setIsOtherRecipient(false);
      setRecipient(selectedValue);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      {isLoading && <LoadingSpinner />}
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Confiesa tu amor</h2>

      {/* Declaración de amor */}
      <textarea
        placeholder="Escribe tu declaración de amor..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      {/* Selector de destinatarios */}
      <select
        value={isOtherRecipient ? 'OTRO' : recipient}
        onChange={handleRecipientChange}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="">Selecciona un destinatario</option>
        {users.map((user) => (
          <option key={user.id} value={`${user.firstName} ${user.lastName}`}>
            {user.firstName} {user.lastName}
          </option>
        ))}
        <option value="OTRO">Otro</option>
      </select>

      {/* Campo para destinatario personalizado */}
      {isOtherRecipient && (
        <input
          type="text"
          placeholder="Introduce el nombre de tu crush"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
      )}

      {/* Checkbox para declaración pública */}
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
          className="mr-2"
        />
        ¿Es pública?
      </label>

      {/* Botón de envío */}
      <button
        onClick={handleSubmit}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded"
      >
        Enviar Declaración
      </button>
    </div>
  );
};

export default LoveDeclaration;
