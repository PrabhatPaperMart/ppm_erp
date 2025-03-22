//
// Copyright (c) 2025 Paptech Corp PVT. LTD. All rights reserved.
//

import React, { useEffect } from 'react';
import { unstable_HistoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import history from './history';
import './App.css';

import {
  ConfigProvider
} from 'antd';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import AppBar from './components/AppBar';
import ProtectedRoute from './components/ProtectedRoute';
import themeConfig from './theme';

const App = () => {

  // useEffect(() => {
  //   getUserProfile()
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <ConfigProvider theme={ themeConfig }>
      <div className="text-black dark:text-white dark:bg-gray-950 min-h-screen flex items-center justify-center p-5">
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
              path="/forgot-password"
              exact
              element={
                <ForgotPasswordPage
                  history={ history }
                />
              }
            />
            <Route
              path="/register"
              exact
              element={
                <RegisterPage
                  history={ history }
                />
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  history={ history }
                >
                  <AppBar />
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <Navigate to="/home" replace />
              }
            />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
};

export default App;
