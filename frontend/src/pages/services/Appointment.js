/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, tokenAtom } from "../../global/globalState";
import Axios from "axios";

const Appointment = () => {
	const [doctor, setDoctor] = useState(null);
	const [symptoms, setSymptoms] = useState(null);
	const [department, setDepartment] = useState(null);
	const [appointmentDate, setAppointmentDate] = useState(new Date());

	const [user, setUser] = useRecoilState(userAtom);
	const token = useRecoilValue(tokenAtom);

	const handleAppointment = () => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/appointment/book`,
			{
				symptoms,
				appointmentDate,
				department,
				doctor,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		Axios.get(`${process.env.REACT_APP_API_URL}/prescription/get`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="Appointment">
			<div className="container">
				<div>
					<h1>Book Appointment</h1>
					<p className="content">
					Patients can book online appointments with a specific doctor and can get prescription afterwards.
					</p>
				</div>
				<div className="appointment-form">
					<label htmlFor="symptoms">Symptoms</label>
					<input
						type="text"
						id="symptoms"
						value={symptoms}
						onChange={(e) => setSymptoms(e.target.value)}
					/>

					<label htmlFor="doctor">Doctor Name</label>
					<input
						type="text"
						id="pass"
						value={doctor}
						onChange={(e) => setDoctor(e.target.value)}
					/>

					<label htmlFor="department">Department</label>
					<input
						type="text"
						id="dept"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
					/>
					<label htmlFor="date">Appointment Date</label>
					<div className="date-pick">
						<input
							type="date"
							value={
								appointmentDate.getFullYear().toString() +
								"-" +
								(appointmentDate.getMonth() + 1)
									.toString()
									.padStart(2, 0) +
								"-" +
								appointmentDate
									.getDate()
									.toString()
									.padStart(2, 0)
							}
							onChange={(e) =>
								setAppointmentDate(e.target.valueAsDate)
							}
						/>
					</div>
					<button
						className="primary"
						onClick={() => handleAppointment()}>
						Book
					</button>
				</div>
				<div className="appointments">
					<h2>Appointments</h2>
					<div className="cards">
						{user.appointment && (
							<div className="card">
								<div className="image">
									<img
										src={require("../../assets/icons/medicine.png")}
										alt="Image"
									/>
								</div>

								<div className="content">
									<h4>Doctor : {user.appointment.doctor}</h4>
									<p>
										Symptoms : {user.appointment.symptoms}
									</p>
									<p>
										Date :{" "}
										{user.appointment.appointmentDate.substring(
											0,
											10
										)}
									</p>
									<div className="prescription">
										<div className="pres">
											Prescription From Doctor
										</div>
										<p>
											{user.appointment.prescription ? (
												<div className="pres-cont">
													<div>
														<strong>
															Real Symptoms
														</strong>{" "}
														:{" "}
														{
															user.appointment
																.prescription
																.symptoms
														}{" "}
													</div>
													<div>
														<strong>
															Medicine
														</strong>{" "}
														:{" "}
														{
															user.appointment
																.prescription
																.medicine
														}{" "}
													</div>
													<div>
														<strong>
															Comments
														</strong>{" "}
														:{" "}
														{
															user.appointment
																.prescription
																.comments
														}{" "}
													</div>
												</div>
											) : (
												<div>
													<p>
														<strong>
															Yet To Presctibe
														</strong>
													</p>
												</div>
											)}
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Appointment;
