import mongoose from "mongoose";
const schema = new mongoose.Schema({
userId: {
    type: String,
    require: true
},
poster:{
    fullName: {
        type: String,
    },
    phone:{
        type: Number,
    },
    avatar: {
        type: String
    },
    userId: {
        type:String
    }
},
type: {
    type: String,
    require: true,
},
title: {
    type: String,
    require: true
},
description: {
    type: String,
    require: true
},
address: {
    type: String
},
information: {
    type: Object
},
other: {
    type: String
},
img: {
       type: Array
    }
,

},
{
    timestamps: true
})
const post = mongoose.model('post', schema)
export default post