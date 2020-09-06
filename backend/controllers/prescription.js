const Patient = require("../models/Patient");
const { spawn } = require("child_process");
const path = require("path");
const Doctor = require("../models/Doctor");
console.log(path.join(__dirname, "scraper", "scraper.py"));
const pathlocation = path.join(__dirname, "scraper", "scraper.py");

//Doctor gives prescription
module.exports.givePrescription = (req, res) => {
	const { patientId, symptoms, medicine, comments } = req.body;

	Patient.findById(patientId).then((patient) => {
		patient.appointment.prescription = {
			symptoms,
			medicine,
			comments,
			date: Date.now(),
		};
		patient.save().then((patient) => {
				Doctor.findById(req.doctor._id)
				.then((doctor) => {
					let index  = doctor.appointments.findIndex((appointment) => {
						console.log(appointment.patient,patient._id)
						appointment.patient === patient._id
					})
					console.log(index,"index");
					doctor.appointment[index].prescription = patient.appointment.prescription; 
				}).catch((err) => {
					console.log(err);
				})
				doctor.save().
				then((doctor) => {
					console.log(doctor);
					res.status(200).json(doctor);
				})
			}) 
			.catch((err) => {
				res.status(422).json(err);
			});
	});
};

//Patient gets prescription
module.exports.getPrescription = (req, res) => {
	Patient.findById(req.patient._id)
		.then((patient) => {
			res.status(200).json(patient.appointment.prescription);
		})
		.catch((err) => {
			res.status(422).json(err);
		});
};

//Doctor will prescribe generic name like paracetamol
// and by using scraper we will get back

module.exports.getPrescribedMedicine = (req, res) => {
	Patient.findById(req.patient._id).then((patient) => {
		var process = spawn("python", [
			pathlocation,
			patient.appointment.prescription.medicine,
		]);
		console.log("ok");
		process.stdout.on("data", (data) => {
			console.log(data, "ok");
			res.send(JSON.parse(data.toString()));
		});
	});
};

//Extra feature just get brand names by giving the medicine's generic name
module.exports.getBrandNames = (req, res) => {
	const { medicine } = req.body;
	var process = spawn("python", [pathlocation, medicine]);
	console.log("ok");
	process.stdout.on("data", (data) => {
		console.log(data, "ok");
		res.send(JSON.parse(data.toString()));
	});
};
