import { Route, Routes } from "react-router";
import AuthenticationPage from "./pages/AuthenticationPage";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route index element={<AuthenticationPage />} />
      <Route path="/Admin" element={<AdminDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
