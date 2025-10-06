import React from "react";
import { Link } from "react-router-dom";
import "./AdminHomePage.css";

export default function AdminHomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">ICESI Bienestar</h1>
          <p className="text-sm text-gray-500">Administrador</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarLink icon={<Home size={18} />} text="Inicio" active />
          <SidebarLink icon={<Users size={18} />} text="Gestión CADI" />
          <SidebarLink icon={<Trophy size={18} />} text="Torneos" />
          <SidebarLink icon={<ClipboardList size={18} />} text="Reportes" />
          <SidebarLink icon={<Bell size={18} />} text="Notificaciones" />
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="grid">
        <Link to="/admin/form-inscripcion" className="card">
          👥 Gestionar Usuarios
        </Link>
        <Link to="/actividades/crear" className="card">
          🎭 Gestionar Actividades
        </Link>
        <Link to="/reportes" className="card">
          📊 Ver Reportes
        </Link>
      </div>
      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <header>
          <h2 className="text-2xl font-bold text-gray-700">📊 Panel general</h2>
          <p className="text-sm text-gray-500">
            Vista general del sistema de Bienestar Universitario
          </p>
        </header>

        {/* Métricas */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Asistencia hoy" value="324" change="+12%" color="text-green-600" icon={<Users size={20} />} />
          <Card title="Inscripciones abiertas" value="1,245" change="+6%" color="text-green-600" icon={<ClipboardList size={20} />} />
          <Card title="Ocupación" value="85%" change="-2%" color="text-red-600" icon={<BarChart3 size={20} />} />
          <Card title="Incidencias" value="3" change="+1%" color="text-red-600" icon={<Activity size={20} />} />
        </section>

        {/* Acciones rápidas */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">⚡ Acciones rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickAction text="Crear actividad" sub="Nueva actividad CADI" />
            <QuickAction text="Publicar torneo" sub="Crear nuevo torneo" />
            <QuickAction text="Enviar notificación" sub="Comunicado masivo" />
          </div>
        </section>

        {/* Actividades recientes + Métricas */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📌 Actividades recientes</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Yoga matutino</span><span className="text-indigo-600">15 participantes</span></li>
              <li className="flex justify-between"><span>Torneo Fútbol 5</span><span className="text-green-600">8 participantes</span></li>
              <li className="flex justify-between"><span>Taller Fotografía</span><span className="text-gray-600">20 participantes</span></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📈 Métricas de la semana</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Nuevos usuarios</span><span className="text-green-600">+23%</span></li>
              <li className="flex justify-between"><span>Actividades completadas</span><span className="text-green-600">+23%</span></li>
              <li className="flex justify-between"><span>Cancelaciones</span><span className="text-red-600">+38%</span></li>
              <li className="flex justify-between"><span>Satisfacción promedio</span><span className="text-green-600">+2%</span></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

/* --- Componentes auxiliares --- */

function SidebarLink({ icon, text, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-2 p-2 rounded-md font-medium ${
        active ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon} {text}
    </a>
  );
}

function Card({ title, value, change, color, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-xl font-bold">{value}</h4>
        <span className={`text-xs ${color}`}>{change}</span>
      </div>
      <div className="text-indigo-600">{icon}</div>
    </div>
  );
}

function QuickAction({ text, sub }) {
  return (
    <button className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 text-left transition">
      <p className="font-semibold text-gray-700">{text}</p>
      <p className="text-sm text-gray-500">{sub}</p>
    </button>
  );
}
