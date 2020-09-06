import React, { useState } from "react";
import Axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../global/globalState";

const Cancer = () => {
	const token = useRecoilValue(tokenAtom);
	const [result, setResult] = useState(null);

	const getResults = () => {
		Axios.get(`${process.env.REACT_APP_API_URL}/predict/cancer`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				console.log(res.data, "ok");
				setResult(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="Cancer">
			<div className="container">
				<div>
					<h1>Cancer Prediction</h1>
					<p className="content">
					Breast Cancer detection which will be able to predict whether the cells are cancerous or not.
					</p>
				</div>

				<button className="primary" onClick={() => getResults()}>
					Get results
				</button>
				<div className="result">
					<h3>{result && JSON.stringify(result)}</h3>
				</div>
			</div>
		</div>
	);
};

export default Cancer;
