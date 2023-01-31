import mongoose from "mongoose";
const schema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: 
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ,
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    fullName: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    social: {
        facebook: {
            type: String
        },
        google: {
            type: String
        },
    },
    post: {
        type: Object
    },
    role: {
        type: String
    }

}, 
{
    timestamps: true
})
const account = mongoose.model('user', schema)
export default account