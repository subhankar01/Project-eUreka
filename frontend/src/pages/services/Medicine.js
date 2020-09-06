import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../global/globalState";
import Axios from "axios";

const Medicine = () => {
	const token = useRecoilValue(tokenAtom);
	const [enteredName, setEnteredName] = useState("");
	const [commonNames, setCommonNames] = useState(null);

	const getBrandNames = () => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/prescription/`,
			{
				medicine: enteredName,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data);
				setCommonNames(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="Medicine">
			<div className="container">
				<div className="top">
					<h1>Common Medicine Names</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Molestias aliquam cumque autem dicta asperiores, fugit
						ex dolor magnam voluptate velit?
					</p>
				</div>

				<div className="main">
					<div className="entered-name">
						<label htmlFor="medicine">Medicine Name</label>
						<input
							type="text"
							value={enteredName}
							onChange={(e) => setEnteredName(e.target.value)}
						/>
					</div>
					<button className="primary" onClick={() => getBrandNames()}>
						Parse
					</button>
					{commonNames && (
						<div className="commons">
							<label htmlFor="commons">Common Medicines</label>
							<div className="result">
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>General Price</th>
											<th>Source</th>
										</tr>
									</thead>
									<tbody>
										{commonNames.map((med) => (
											<tr>
												<td>{med.medicine_name}</td>
												<td>{med.Price}</td>
												<td>{med.Source}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Medicine;
