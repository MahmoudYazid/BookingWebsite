import mongoose, { Schema, model } from "mongoose";

const appointmentSchima = new Schema({
    patientname: String,
    doctorname: String,
    startdate: String,
    enddate: String,

})
const doctorstimeSchima = new Schema({
    doctorname: String,
    startdate: String,
    enddate: String,
    sessionduration: String,

})
const usersSchima = new Schema({
    name: String,
    password: String,
    type:String

})

export const appointmentModel = mongoose.models.appointment || model('appointment', appointmentSchima)
export const doctorstimeModel = mongoose.models.doctorstime || model('doctorstime', doctorstimeSchima)
export const UsersModel = mongoose.models.users || model('users', usersSchima)