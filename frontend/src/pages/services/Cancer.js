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
					<h1>Cancer Predection</h1>
					<p className="content">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Fuga cupiditate repudiandae quos natus repellat?
						Reiciendis excepturi maiores recusandae ipsam a.
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
