import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";

const DashboardDoc = ({ history }) => {
	const token = useRecoilValue(tokenAtom);
	const [user, setUser] = useRecoilState(userAtom);

	//State
	const [symptoms, setSymptoms] = useState("");
	const [medicine, setMedicine] = useState("");
	const [comments, setComments] = useState("");

	const givePrescripotion = (pID) => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/prescription/give`,
			{
				patientId: pID,
				symptoms,
				medicine,
				comments,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data);
				// setUser(res.data);
				// localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		Axios.get(`${process.env.REACT_APP_API_URL}/appointment/upcoming`, {
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
		<div className="DashboardDoc">
			<div className="container">
				<h1>Welcome Doctor</h1>
				<h3>Your Appointments</h3>
				<div className="cards">
					{user.appointments.map((appointment) => (
						<div className="card">
							<div className="image">
								<img
									src={require("../assets/icons/doctor.png")}
									alt="Doctor Logo"
								/>
							</div>

							<div className="content">
								<h4>
									No : {appointment.patient.substring(14)}
								</h4>
								<p>Symptopms : {appointment.symptoms}</p>
							</div>

							<div className="prescribe-input">
								<label>Symptoms</label>
								<input
									type="text"
									value={symptoms}
									onChange={(e) =>
										setSymptoms(e.target.value)
									}
								/>
								<label>Medicine</label>
								<input
									type="text"
									value={medicine}
									onChange={(e) =>
										setMedicine(e.target.value)
									}
								/>
								<label>Comments</label>
								<input
									type="text"
									value={comments}
									onChange={(e) =>
										setComments(e.target.value)
									}
								/>
								<button
									className="primary"
									onClick={() =>
										givePrescripotion(appointment.patient)
									}>
									Submit
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardDoc;
