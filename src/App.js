import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientSignup from "./pages/PatientSignup";
import DoctorSignup from "./pages/DoctorSignup";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />

        <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard />}
        />

        <Route
          path="/patient-signup"
          element={<PatientSignup />}
        />

        <Route
          path="/doctor-signup"
          element={<DoctorSignup />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;