                         import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import PublicDeclarations from './components/PublicDeclarations';
import PrivateDeclarations from './components/PrivateDeclarations';
import LoveDeclaration from './components/LoveDeclaration';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<PublicDeclarations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/private" element={<PrivateDeclarations />} />
            <Route path="/love" element={<LoveDeclaration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
