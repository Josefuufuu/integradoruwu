import React, { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout.jsx";

const availablePermissions = [
  {
    id: "users:read",
    label: "Ver usuarios",
    description: "Permite visualizar la información de los usuarios registrados.",
  },
  {
    id: "users:update",
    label: "Editar usuarios",
    description: "Autoriza la edición de datos personales y de contacto.",
  },
  {
    id: "roles:manage",
    label: "Administrar roles",
    description: "Permite crear, actualizar y eliminar roles dentro del sistema.",
  },
  {
    id: "activities:approve",
    label: "Aprobar actividades",
    description: "Da acceso a la moderación y publicación de actividades del CADI.",
  },
  {
    id: "reports:view",
    label: "Consultar reportes",
    description: "Autoriza el acceso a los reportes y paneles estadísticos.",
  },
];

const initialFormState = {
  name: "",
  description: "",
  permissions: [],
};

export default function CreateRolePage() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const isFormValid = useMemo(() => {
    return formData.name.trim().length > 0 && formData.permissions.length > 0;
  }, [formData.name, formData.permissions]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleTogglePermission = (permissionId) => {
    setFormData((previous) => {
      const alreadyIncluded = previous.permissions.includes(permissionId);

      return {
        ...previous,
        permissions: alreadyIncluded
          ? previous.permissions.filter((permission) => permission !== permissionId)
          : [...previous.permissions, permissionId],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      setStatus({ type: "error", message: "Por favor completa el nombre del rol y selecciona al menos un permiso." });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Guardando rol..." });

      // En la integración real este sería un llamado al backend (por ejemplo /api/roles)
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus({ type: "success", message: "Rol creado correctamente. Ahora puedes asociarlo a usuarios." });
      setFormData(initialFormState);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Ocurrió un error al crear el rol. Intenta de nuevo más tarde.",
      });
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">Administración</p>
          <h1 className="text-3xl font-semibold text-slate-900">Crear roles</h1>
          <p className="text-base text-slate-600">
            Define los perfiles de acceso que podrán usarse para controlar las funcionalidades del sistema.
            Esta vista está restringida a cuentas con privilegios de administrador.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr,1fr]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Nombre del rol
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej. Administrador CADI"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Descripción (opcional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe el alcance de este rol y responsabilidades principales."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Permisos disponibles</h2>
                  <p className="text-sm text-slate-500">
                    Selecciona las capacidades que tendrá el rol dentro de la plataforma.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-500">
                  {formData.permissions.length} seleccionados
                </span>
              </div>

              <div className="space-y-3">
                {availablePermissions.map((permission) => {
                  const checked = formData.permissions.includes(permission.id);

                  return (
                    <label
                      key={permission.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        checked
                          ? "border-violet-300 bg-violet-50"
                          : "border-slate-200 bg-white hover:border-violet-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleTogglePermission(permission.id)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                      />
                      <span className="space-y-1">
                        <span className="block text-sm font-semibold text-slate-800">{permission.label}</span>
                        <span className="block text-sm text-slate-500">{permission.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              {status.type === "success" && (
                <span className="text-sm font-medium text-emerald-600">{status.message}</span>
              )}
              {status.type === "error" && (
                <span className="text-sm font-medium text-rose-600">{status.message}</span>
              )}
              {status.type === "loading" && (
                <span className="text-sm font-medium text-slate-500">{status.message}</span>
              )}

              <div className="flex w-full gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialFormState);
                    setStatus({ type: "idle", message: "" });
                  }}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:flex-none"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="flex-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300 sm:flex-none"
                >
                  Guardar rol
                </button>
              </div>
            </div>
          </form>

          <aside className="space-y-4 rounded-2xl border border-violet-100 bg-violet-50 p-6 text-sm text-slate-700 shadow">
            <h2 className="text-base font-semibold text-violet-900">Integración con Spring Security</h2>
            <p>
              Para proteger esta vista y las operaciones relacionadas, el backend debe exponer un endpoint
              asegurado que valide que el usuario autenticado posee el permiso <code>roles:manage</code>.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Configura un <span className="font-semibold">AuthenticationProvider</span> que consulte los usuarios y sus roles.
              </li>
              <li>
                Registra un <span className="font-semibold">AuthenticationManager</span> que delegue en el proveedor configurado.
              </li>
              <li>
                Define reglas de autorización en tu <code>SecurityFilterChain</code> restringiendo <code>POST /roles</code>
                únicamente a administradores.
              </li>
              <li>
                Emplea anotaciones como <code>@PreAuthorize("hasAuthority('roles:manage')")</code> en el controlador correspondiente.
              </li>
            </ul>
            <p>
              Una vez configurada la seguridad, reemplaza la simulación de guardado por una petición real al servicio de roles.
            </p>
          </aside>
        </div>
      </section>
    </AppLayout>
  );
}
