import React from "react";
import Card from "../components/Card";
import { useRecoilValue } from "recoil";
import { userAtom } from "../global/globalState";

const services = [
	{
		title: "Cancer Predection",
		image: require("../assets/icons/heart.png"),
		imageAlt: "Heart Icon",
		desc:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, aspernatur!",
		link: "/dashboard/cancer",
	},
	{
		title: "Pneumonia Predection",
		image: require("../assets/icons/face.png"),
		imageAlt: "Face Icon",
		desc:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, aspernatur!",
		link: "/dashboard/pneumonia",
	},
	{
		title: "General Name of Medicines",
		image: require("../assets/icons/medicine.png"),
		imageAlt: "Medicine Icon",
		desc:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, aspernatur!",
		link: "/dashboard/medicine",
	},
	{
		title: "Book A Appointment",
		image: require("../assets/icons/doctor.png"),
		imageAlt: "Doctor Icon",
		desc:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, aspernatur!",
		link: "/dashboard/doctor",
	},
	{
		title: "Heart Health Predection",
		image: require("../assets/icons/heart.png"),
		imageAlt: "Heart Icon",
		desc:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, aspernatur!",
		link: "/dashboard/heart",
	},
];

const Dashboard = () => {
	const user = useRecoilValue(userAtom)
	return (
		<div className="Dashboard">
			<div className="container">
				<h1>Hi {user.name}</h1>
				<div className="cards">
					{services.map(({ imageAlt, title, image, desc, link }) => (
						<Card
							key={title}
							title={title}
							image={image}
							imageAlt={imageAlt}
							desc={desc}
							link={link}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
