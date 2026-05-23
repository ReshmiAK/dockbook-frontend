import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

function DoctorSignup() {

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        name: "",
        email: "",
        password: "",
        specialization: "",
        available_date: "",
        available_time: "",
        consultation_fee: ""
    });

    const handleChange = (e) => {

        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });

    };

    const handleSignup = async () => {

        try {

            await axios.post(
                "http://localhost:8080/doctorSignup",
                doctor
            );

            alert("Doctor Registered Successfully");

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
                    Doctor Signup
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={doctor.name}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={doctor.email}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={doctor.password}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="date"
                    name="available_date"
                    value={doctor.available_date}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
    type="text"
    name="available_time"
    placeholder="Example: 1 PM to 5 PM"
    value={doctor.available_time}
    onChange={handleChange}
    style={inputStyle}
/>

                <input
                    type="number"
                    name="consultation_fee"
                    placeholder="Consultation Fee"
                    value={doctor.consultation_fee}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    onClick={handleSignup}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#9b59b6",
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

export default DoctorSignup;