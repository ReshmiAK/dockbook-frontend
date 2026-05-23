import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        // TRY PATIENT LOGIN

        try {

            const response = await axios.post(
                "http://localhost:8080/patientLogin",
                {
                    email: email,
                    password: password
                }
            );

            if(response.data.role === "PATIENT") {

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                localStorage.setItem(
                    "userId",
                    response.data.id
                );

                navigate("/patient-dashboard");

                return;
            }

        }

        catch(error) {

            console.log("Not Patient");

        }

        // TRY DOCTOR LOGIN

        try {

            const response = await axios.post(
                "http://localhost:8080/doctorLogin",
                {
                    email: email,
                    password: password
                }
            );

            if(response.data.role === "DOCTOR") {

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                localStorage.setItem(
                    "userId",
                    response.data.id
                );

                navigate("/doctor-dashboard");

                return;
            }

        }

        catch(error) {

            console.log("Not Doctor");

        }

        alert("Invalid Login");

    };

    return (

    <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8"
    }}>

        <div style={{
            width: "350px",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            textAlign: "center"
        }}>

            <h1 style={{
                marginBottom: "30px",
                color: "#2c3e50"
            }}>
                DOCBOOK
            </h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                }}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                }}
            />

            <button
                onClick={handleLogin}
                style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                Login
            </button>

            <h3 style={{
                marginTop: "25px",
                color: "#555"
            }}>
                New User?
            </h3>

            <button
                onClick={() => navigate("/patient-signup")}
                style={{
                    padding: "10px",
                    marginRight: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#2ecc71",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Patient Signup
            </button>

            <button
                onClick={() => navigate("/doctor-signup")}
                style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#9b59b6",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Doctor Signup
            </button>

        </div>

    </div>

);

}

export default Login;