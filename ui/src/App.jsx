//
// Copyright (c) 2025 Paptech Corp PVT. LTD. All rights reserved.
//

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import history from './history';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router history={ history }>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              history={ history }
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              history={ history }
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
