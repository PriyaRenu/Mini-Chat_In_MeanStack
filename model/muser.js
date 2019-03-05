const mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
schema = mongoose.Schema,
userSchema = new schema({
	userName:{type: String,require:true},
	email:{type:String,require:true,unique:true},
	password:{type:String,require:true},
	age:{type:Number,require:true},
    crAt:{type:Date,default:Date.now}
});
module.exports={user:mongoose.model('user',userSchema)}
userSchema.plugin(uniqueValidator);