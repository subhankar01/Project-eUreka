import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../global/globalState";

const Home = ({ history }) => {
	const user = useRecoilValue(userAtom);
	console.log(user);
	const cta = () => {
		if (!user) {
			history.push("/SignUp");
		} else {
			if (user.type === "user") history.push("/dashboard");
			else history.push("/dashboardDoc");
		}
	};

	return (
		<div className="Home">
			<div className="container">
				{/* TOP SECTION  */}
				<div className="top">
					<div className="left">
						<h3 className="welcome">
							Welcome to{" "}
							<div className="logo">
								<h1>eUreka</h1>
							</div>
						</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Doloremque, quisquam dolorem voluptatibus
							cupiditate deleniti amet maiores hic neque est iste.
						</p>
						<button className="primary cta" onClick={() => cta()}>
							{user ? "Go To Dashboard" : "Get Started"}
						</button>
					</div>
					<div className="right">
						<img src={require("../assets/svg/doc3.svg")} alt="" />
					</div>
				</div>

				<div className="middle">
					<h2>Features</h2>
					<div className="cards">
						<div className="card">
							<img
								src={require("../assets/icons/heart.png")}
								alt="Heart Icon"
							/>
							<div className="content">
								<h4>Lorem Ipsum</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Beatae, tempore.
								</p>
							</div>
						</div>
						<div className="card">
							<img
								src={require("../assets/icons/medicine.png")}
								alt="Heart Icon"
							/>
							<div className="content">
								<h4>Lorem Ipsum</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Beatae, tempore.
								</p>
							</div>
						</div>
						<div className="card">
							<img
								src={require("../assets/icons/doctor.png")}
								alt="Heart Icon"
							/>
							<div className="content">
								<h4>Lorem Ipsum</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Beatae, tempore.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
