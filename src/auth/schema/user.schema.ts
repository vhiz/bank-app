import * as mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId
export const UserSchema = new mongoose.Schema({
    username: {type: String, require: true,},
    email: {type: String, require: true},
    password: {type: String, require: true},
    _id: {type: String, default: ()=>{
        return new ObjectId().toString()
    }},
    isAdmin:{type: Boolean, default:false},
    tokenId:{type: String}
}, {timestamps: true})