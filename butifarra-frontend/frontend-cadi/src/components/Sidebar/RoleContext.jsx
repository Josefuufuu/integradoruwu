import { createContext, useContext, useState, useEffect } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      // TODO: reemplazar por la consulta real al backend una vez exista integración con Spring Security
      const response = await Promise.resolve("Administrador");
      setRole(response);
    };

    fetchUserRole();
  }, []);

  return (
    <RoleContext.Provider value={role}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);