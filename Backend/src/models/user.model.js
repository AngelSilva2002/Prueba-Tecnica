import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    python: {
        type: Number,
        required: true
    },
    java: {
        type: Number,
        required: true
    },
    js: {
        type: Number,
        required: true
    },
    C: {
        type: Number,
        required: true
    },
    Cplus: {
        type: Number,
        required: true
    }
},{
    timestamps: true    
})

export default mongoose.model('User', UserSchema)