import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import BranchPage from "./pages/BranchPage";
import { useContext } from "react";

function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/branch"
            element={
              <PrivateRoute role="branch">
                <BranchPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
  );
}
