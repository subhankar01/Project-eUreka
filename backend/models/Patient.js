const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;
const patientSchema = new schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    age : {
        type : Number
    },
    bloodGroup : {
        type : String
    },
    address : {
        type : String
    },
    password : {
        type : String
    },
    type : {
        type : String,
        default : "user"
    },
    appointment : {
        symptoms : {
            type : String
        },
        appointmentDate : {
            type : String
        },
        department : {
            type : String
        },
        doctor : {
            type : ObjectId,
            ref : "Doctor"
        },
        prescription : {
            symptoms : {
                type : String
            },
            medicine : {
                type : String
            },
            comments : {
                type : String
            },
            date : {
                type : Date
            }
        }
    }
})

const Patient = mongoose.model("Patient",patientSchema);

module.exports = Patient;