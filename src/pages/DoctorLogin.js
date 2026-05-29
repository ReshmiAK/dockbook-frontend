import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        const data = {
            email: email,
            password: password
        };

        try {

            const response = await axios.post(
                "http://localhost:8080/doctorLogin",
                data
            );

            console.log(response.data);

            if(response.data.message === "Login Success") {

                localStorage.setItem(
                    "userId",
                    response.data.userId
                );

                localStorage.setItem(
                    "doctorName",
                    response.data.name
                );

                navigate("/doctor-dashboard");

            }

            else {

                alert("Invalid Login");

            }

        }

        catch(error) {

            console.log(error);

            alert("Login Failed");

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
                width: "400px",
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                textAlign: "center"
            }}>

                <h1 style={{
                    marginBottom: "25px",
                    color: "#2c3e50"
                }}>
                    Doctor Login
                </h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={inputStyle}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#8e44ad",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </div>

        </div>

    );

}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
};

export default DoctorLogin;