import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    phone: { type: Number, required: true },
    charAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.model("Contact", ContactSchema);
