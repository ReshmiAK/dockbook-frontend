import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function DoctorDashboard() {

    const [appointments, setAppointments] =
        useState([]);

    const doctorId =
        localStorage.getItem("userId");

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/doctorAppointments/${doctorId}`
            );

            setAppointments(response.data);

        }

        catch(error) {

            console.log(error);

        }

    };

  return (

    <div className="dashboard-container">

        <button
            className="logout-btn"
            onClick={() => {

                localStorage.clear();
                window.location.href = "/login";

            }}
        >
            Logout
        </button>

        <h1 className="dashboard-title">
            Doctor Dashboard
        </h1>

        <h2 className="dashboard-title">
            Booked Appointments
        </h2>

        {

            appointments.map((appointment, index) => (

                <div
                    key={index}
                    className="appointment-card"
                >

                    <h3>
                        Patient:
                        {" "}
                        {appointment.patientName}
                    </h3>

                    <p>
                        <b>Email:</b>
                        {" "}
                        {appointment.patientEmail}
                    </p>

                    <p>
                        <b>Phone:</b>
                        {" "}
                        {appointment.patientPhone}
                    </p>

                    <p>
                        <b>Slot:</b>
                        {" "}
                        {appointment.startTime}
                        {" - "}
                        {appointment.endTime}
                    </p>

                    <p>
                        <b>Status:</b>
                        {" "}
                        {appointment.status}
                    </p>

                </div>

            ))

        }

    </div>

);

}

export default DoctorDashboard;