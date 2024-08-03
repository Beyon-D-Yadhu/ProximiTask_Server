import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema({
    name:String,
    email:String,
    password:String,
    area:String,
    category:String,
    phoneNumber:String,
    idCard:String,
    idCardNum:String
})

const WorkerModel = mongoose.model('Worker',workerSchema);

export default WorkerModel;