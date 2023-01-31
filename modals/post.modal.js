import mongoose from "mongoose";
const schema = new mongoose.Schema({
userId:{
    type: String,
    require: true,
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
}


},
{
    timestamps: true
})
const post = mongoose.model('post', schema)
export default post