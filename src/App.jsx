import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, SurveyForm } from "@/layouts";
import { AuthProvider } from "@/context/Auth";
import { PrivateRoute, PrivateRouteL } from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/survey/create-survey" element={
          <PrivateRoute>
            <SurveyForm />
          </PrivateRoute>
        } />
        <Route path="/auth/*" element={
          <PrivateRouteL>
            <Auth />
          </PrivateRouteL>
        } />
        <Route path="*" element={<Navigate to="/auth/sign-up" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
