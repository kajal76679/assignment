import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Popup from '../components/popup';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/receipt" element={<Popup />} />
    </Routes>
  );
}

export default AppRoutes;
