const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type: String,
        require:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    avatar:{
        type:String,
        trim:true
    },
    siteweb:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    createAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("User", userSchema);