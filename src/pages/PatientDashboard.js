import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function PatientDashboard() {

    const [doctors, setDoctors] = useState([]);

    const [slots, setSlots] = useState([]);

    const [appointments, setAppointments] =
        useState([]);

    const [selectedDoctor, setSelectedDoctor] =
        useState(null);

    useEffect(() => {

        fetchDoctors();
        fetchAppointments();

    }, []);

    // FETCH ALL DOCTORS

    const fetchDoctors = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/doctors"
            );

            setDoctors(response.data);

        }

        catch(error) {

            console.log(error);

        }

    };

    // FETCH DOCTOR SLOTS

    const fetchSlots = async (doctorId) => {

        try {

            const response = await axios.get(
                `http://localhost:8080/doctorSlots/${doctorId}`
            );

            setSlots(response.data);

            setSelectedDoctor(doctorId);

        }

        catch(error) {

            console.log(error);

        }

    };

    // FETCH PATIENT APPOINTMENTS

    const fetchAppointments = async () => {

        try {

            const patientId =
                localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8080/patientAppointments/${patientId}`
            );

            setAppointments(response.data);

        }

        catch(error) {

            console.log(error);

        }

    };

    // BOOK APPOINTMENT

    const bookAppointment = async (
        doctorId,
        slotId
    ) => {

        try {

            const patientId =
                parseInt(localStorage.getItem("userId"));

            if (!patientId || isNaN(patientId)) {

                alert(
                    "You must be logged in to book an appointment."
                );

                return;

            }

            const appointmentData = {

                patientId: patientId,
                doctorId: doctorId,
                slotId: slotId

            };

            console.log(appointmentData);

            const response = await axios.post(
                "http://localhost:8080/bookAppointment",
                appointmentData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            alert(response.data);

            // REFRESH DATA AFTER BOOKING

            fetchSlots(doctorId);

            fetchAppointments();

        }

        catch(error) {

            console.log(error);

            console.log(error.response);

            alert("Appointment Booking Failed");

        }

    };

    // CANCEL APPOINTMENT

    const cancelAppointment = async (
        appointmentId
    ) => {

        try {

            const response = await axios.put(
                `http://localhost:8080/cancelAppointment/${appointmentId}`
            );

            alert(response.data);

            fetchAppointments();

            fetchDoctors();

            if(selectedDoctor) {

                fetchSlots(selectedDoctor);

            }

        }

        catch(error) {

            console.log(error);

            alert("Appointment Cancel Failed");

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
            Available Doctors
        </h1>

        <div className="doctor-grid">

            {

                doctors.map((doctor) => (

                    <div
                        key={doctor.id}
                        className="doctor-card"
                    >

                        <h2>{doctor.name}</h2>

                        <p>
                            <b>Specialization:</b>
                            {" "}
                            {doctor.specialization}
                        </p>

                        <p>
                            <b>Experience:</b>
                            {" "}
                            {doctor.experience}
                        </p>

                        <p>
                            <b>Consultation Fee:</b>
                            {" "}
                            ₹{doctor.consultationFee}
                        </p>

                        <button
                            className="slot-btn available-slot"
                            onClick={() =>
                                fetchSlots(doctor.id)
                            }
                        >
                            View Slots
                        </button>

                        {

                            selectedDoctor === doctor.id && (

                                <div className="slot-container">

                                    {

                                        slots.map((slot) => (

                                            <button

                                                key={slot.slotId}

                                                onClick={() => {

                                                    if(!slot.booked) {

                                                        bookAppointment(
                                                            doctor.id,
                                                            slot.slotId
                                                        );

                                                    }

                                                }}

                                                className={`slot-btn ${
                                                    slot.booked
                                                    ? "booked-slot"
                                                    : "available-slot"
                                                }`}
                                            >

                                                {slot.startTime}
                                                {" - "}
                                                {slot.endTime}

                                            </button>

                                        ))

                                    }

                                </div>

                            )

                        }

                    </div>

                ))

            }

        </div>

        <h1 className="dashboard-title">
            Your Appointments
        </h1>

        {

            appointments.map((appointment) => (

                <div
                    key={appointment.appointmentId}
                    className="appointment-card"
                >

                    <p>
                        <b>Doctor ID:</b>
                        {" "}
                        {appointment.doctorId}
                    </p>

                    <p>
                        <b>Slot ID:</b>
                        {" "}
                        {appointment.slotId}
                    </p>

                    <p>
                        <b>Status:</b>
                        {" "}
                        {appointment.status}
                    </p>

                    {

                        appointment.status === "BOOKED" && (

                            <button

                                className="slot-btn booked-slot"

                                onClick={() =>
                                    cancelAppointment(
                                        appointment.appointmentId
                                    )
                                }

                            >

                                Cancel Appointment

                            </button>

                        )

                    }

                </div>

            ))

        }

    </div>

);

}

export default PatientDashboard;