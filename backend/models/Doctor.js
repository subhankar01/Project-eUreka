const mongoose = require("mongoose");
const schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types;

const doctorSchema = new schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    department : {
        type : String
    },
    type : {
        type : String,
        default : "doctor"
    },
    appointments : [{
        patient : {
            type : ObjectId,
            ref : "Patient"
        }
    }],
    password : {
        type : String
    }
})

const Doctor = mongoose.model("Doctor",doctorSchema);

module.exports = Doctor;