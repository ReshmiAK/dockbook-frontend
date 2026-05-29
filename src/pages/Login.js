import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handlePatientContinue = async () => {

        if (!name || !phone) {
            alert("Please fill all fields");
            return; 
        }

        try {

           const response = await axios.post(
            `http://localhost:8080/patientEntry`,
                {
                    name: name,
                    phoneNumber: phone
                }
            );
            console.log(response.data);

            localStorage.setItem(
                "patientName",
                response.data.name
            );

            localStorage.setItem(
                "userId",
                response.data.id
            );

            navigate("/patient-dashboard");

        }

        catch (error) {

            console.log(error);

            alert("Backend not responding");

        }

    };

    return (

        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f4f8"
        }}>

            <div style={{
                width: "380px",
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
            }}>

                <h1 style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    color: "#2c3e50"
                }}>
                    DOCBOOK
                </h1>

                <p style={{
                    textAlign: "center",
                    color: "gray",
                    marginBottom: "30px"
                }}>
                    Patient Entry
                </p>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                />

                <button
                    onClick={handlePatientContinue}
                    style={buttonStyle}
                >
                    Continue as Patient
                </button>

                <hr style={{
                    marginTop: "30px",
                    marginBottom: "20px"
                }} />

                <button
                    onClick={() => navigate("/doctorLogin")}
                    style={{
                        ...buttonStyle,
                        backgroundColor: "#8e44ad"
                    }}
                >
                    Doctor Login
                </button>

                <button
                    onClick={() => navigate("/doctorSignup")}
                    style={{
                        ...buttonStyle,
                        marginTop: "15px",
                        backgroundColor: "#16a085"
                    }}
                >
                    Doctor Signup
                </button>

            </div>

        </div>

    );

}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#3498db",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
};

export default Login;