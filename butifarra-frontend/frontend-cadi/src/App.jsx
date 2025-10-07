
// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./context/AuthContext.jsx";
import { useRole } from "./components/Sidebar/RoleContext.jsx";
import HomeBeneficiary from "./pages/HomeBeneficiary.jsx";
import AdminHomePage from "./pages/AdminHomePage.jsx";
import CreateActivity from "./pages/CreateActivity.jsx";
import CreateRolePage from "./pages/CreateRolePage.jsx";
import TestRatingPage from "./pages/TestRatingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminFormInscripcion from "./pages/AdminFormInscripcion";
import AdminReport from "./pages/AdminReport.jsx"
import ReactDOM from 'react-dom/client';
import { RoleProvider } from "./components/Sidebar/RoleContext.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import GestionCadiPage from "./pages/GestionCadiPage.jsx";
import TorneosPage from "./pages/TorneosPage.jsx";
import PsuVoluntariadosPage from "./pages/PsuVoluntariadosPage.jsx";
import CitasPsicologicasPage from "./pages/CitasPsicologicasPage.jsx";
import ReportesPage from "./pages/ReportesPage.jsx";


function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1>404</h1>
      <p>Ruta no encontrada.</p>
    </div>
  );
}

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};


export function AdminRoute({ children }) {
  const role = useRole();
  const location = useLocation();

  if (!role) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Verificando permisos...
      </div>
    );
  }

  if (role !== "Administrador") {
    return <Navigate to="/inicio" replace state={{ from: location }} />;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node,
};



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de beneficiario */}
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={(<HomeBeneficiary userName="Pablo" />)} />
        <Route path="/HomeBeneficiary" element={(<HomeBeneficiary userName="Pablo" />)} />
        <Route path="/gestion-cadi" element={(<GestionCadiPage />)} />
        <Route path="/torneos" element={(<TorneosPage />)} />
        <Route path="/psu" element={(<PsuVoluntariadosPage />)} />
        <Route path="/citas" element={(<CitasPsicologicasPage />)} />
        <Route path="/reportes" element={(<ReportesPage />)} />

        {/* Rutas de administrador */}
        <Route path="/admin/reports" element={<AdminReport />} />
        <Route path="/admin/home" element={(<AdminHomePage />)} />
        <Route path="/test-rating" element={(<TestRatingPage />)} />
        <Route path="/notificaciones" element={(<NotificationsPage />)} />
        <Route path="/actividades/crear" element={(<CreateActivity />)} />
        <Route path="/admin/form-inscripcion" element={(<AdminFormInscripcion />)} />
        <Route
          path="/admin/roles/crear"
          element={(
            <PrivateRoute>
              <AdminRoute>
                <CreateRolePage />
              </AdminRoute>
            </PrivateRoute>
          )}
        />

        {/* login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Página de error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
