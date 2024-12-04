import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const PublicDeclarations = () => {
  const [declarations, setDeclarations] = useState([]);

  useEffect(() => {
    const fetchDeclarations = async () => {
      try {
        const q = query(collection(firestore, 'declarations'), where('isPublic', '==', true));
        const querySnapshot = await getDocs(q);
        const declarationsList = querySnapshot.docs.map(doc => doc.data());
        setDeclarations(declarationsList);
      } catch (error) {
        console.error('Error fetching public declarations:', error);
      }
    };

    fetchDeclarations();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Declaraciones Públicas</h2>
      {declarations.length > 0 ? (
        declarations.map((declaration, index) => (
          <div key={index} className="mb-4 p-4 border-b">
            <p className="text-lg">{declaration.body}</p>
            <small className="text-gray-500">
              De: {declaration.author || 'Anónimo'} &middot; Para: {declaration.recipient}
            </small>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay declaraciones públicas aún.</p>
      )}
    </div>
  );
};

export default PublicDeclarations;
