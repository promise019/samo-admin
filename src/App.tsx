import { Route, Routes } from "react-router";
import AuthenticationPage from "./pages/AuthenticationPage";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/dashboard";
import AdminPostedPosts from "./pages/adminPosts";
import StatisticsPage from "./pages/statistics";
import SheduledPosts from "./pages/ScheduledPosts";

export default function App() {
  return (
    <Routes>
      <Route index element={<AuthenticationPage />} />
      <Route path="/Admin" element={<AdminDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<AdminPostedPosts />} />
        <Route path="analytics" element={<StatisticsPage />} />
        <Route path="scheduleposts" element={<SheduledPosts />} />
      </Route>
    </Routes>
  );
}
