import * as mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId
export const UserSchema = new mongoose.Schema({
    username: {type: String, require: true,},
    email: {type: String, require: true},
    password: {type: String, require: true},
    userId: {type: String, default: ()=>{
        return new ObjectId().toString()
    }}
}, {timestamps: true})