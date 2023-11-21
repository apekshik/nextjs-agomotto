import mongoose, {Schema} from "mongoose";

const contactSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be lesser than 50 characters"],
    },

    email:{
        type: String,
        required: [true, "Email is required."],
        match: [/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i, "Invalid email address"],
    },

    message:{
        type: String,
        required: [true, "Message is required."],
    }
},
    { timestamps: true }
);


const Contact = mongoose.models.Contacts || mongoose.model("Contacts", contactSchema);

export default Contact;