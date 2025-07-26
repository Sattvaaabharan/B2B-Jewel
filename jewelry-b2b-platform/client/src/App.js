import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import RFQList from './pages/RFQList';
import Messaging from './pages/Messaging';

const PrivateRoute = ({ children, roles }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (roles && roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={['user']}>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/rfqs"
          element={
            <PrivateRoute roles={['user', 'admin']}>
              <RFQList />
            </PrivateRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <PrivateRoute roles={['user', 'admin']}>
              <Messaging />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
