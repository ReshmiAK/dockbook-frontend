import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/pages/Login";
import DoctorLogin from "../src/pages/DoctorLogin";
import DoctorSignup from "../src/pages/DoctorSignup";
import PatientDashboard from "../src/pages/PatientDashboard";
import DoctorDashboard from "../src/pages/DoctorDashboard";
import PatientSignup from "../src/pages/PatientSignup";

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
          path="/doctorLogin"
          element={<DoctorLogin />}
        />

        <Route
          path="/doctorSignup"
          element={<DoctorSignup />}
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
          path="/patientSignup"
          element={<PatientSignup />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;