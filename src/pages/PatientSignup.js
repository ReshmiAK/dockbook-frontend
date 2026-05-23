import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PatientSignup() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        address: "",
        age: "",
        blood_group: ""
    });

    const handleChange = (e) => {

        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });

    };

    const handleSignup = async () => {

        try {

            await axios.post(
                "http://localhost:8080/patientSignup",
                patient
            );

            alert("Patient Registered Successfully");

            navigate("/login");

        }

        catch(error) {

            console.log(error);

            alert("Signup Failed");

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
                    Patient Signup
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={patient.name}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={patient.email}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={patient.password}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Enter Phone Number"
                    value={patient.phone_number}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Enter Age"
                    value={patient.age}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="blood_group"
                    placeholder="Enter Blood Group"
                    value={patient.blood_group}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <textarea
                    name="address"
                    placeholder="Enter Address"
                    value={patient.address}
                    onChange={handleChange}
                    style={{
                        ...inputStyle,
                        height: "80px",
                        resize: "none"
                    }}
                />

                <button
                    onClick={handleSignup}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}
                >
                    Signup
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

export default PatientSignup;