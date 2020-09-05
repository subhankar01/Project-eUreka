const Patient = require("../models/Patient");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports.signup = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors : errors.array()
        })
    }

    const {name,email,phone,age,bloodGroup,address,password} = req.body;

    //Checking if the patient is already signed up or not
    Patient.findOne({
        email
    }).then((patient) => {
        if(patient) {
            re.status(400).json({
                errors : [{msg : "Email already exists"}]
            })
        }
    })

    //If not save the new User
    bcrypt.hash(password,10).then((hashedPass) => {
        const newPatient = new Patient({
            name,
            email,
            phone,
            age,
            bloodGroup,
            address,
            password : hashedPass
        })

        newPatient.save()
        .then((savedPatient) => {
            res.status(200).json(savedPatient);
        }).catch(() => {
            res.status(400).json({
                errors : [{msg : "Error while registering the patient"}]
            })
        })
    
    })
}

module.exports.signin = (req,res) => {
    const {email,password} = req.body;
    
    Patient.findOne({
        email
    }).then((patient) => {
        if(!patient) {
            return res.status(422).json({
                errors : [{msg : "Invalid credentials"}]
            })
        }

        bcrypt.compare(password,patient.password)
        .then((isMatch) => {

            //If password matches then issue a token depending upon the payload given
            if(isMatch) {
                const token = jwt.sign({
                    _id : patient._id
                },secret)
                
                const {_id,email,name,age,bloodGroup,type} = patient;

                res.json({
                    token,
                    patient : {_id,email,name,age,bloodGroup,type}
                })
            }

            else {
                res.json({
                    errors : [{msg : "Invalid Credentials"}]
                })
            }

        }).catch((err) => {
            console.log(err);
        })
    })
}

module.exports.dashboard = (req,res) => {
    Patient.findById(req.patient._id)
    .then((patient) => {
        res.status(200).json(patient);
    }).catch((err) => {
        res.status(422).json(err);
    })
}