// Implementacion(resolvers) de las consultas de typeDefs
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

function createToken(user, SECRET_KEY, expiresIn){
    const { id, name, email, username} = user;

    const payload={
        id,
        name,
        email,
        username
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register( input) {
     
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const {email, username, password} = newUser;
 
    const foundEmail = await User.findOne({ email });
    if(foundEmail) throw new Error("Email exists.");

     const foundUsername = await User.findOne({ username });
     if(foundUsername) throw new Error("Username exists.");
     
     //Encrip password
     const salt = await bcryptjs.genSaltSync(10);
     newUser.password = await bcryptjs.hash(password, salt);
     //

     try {
         const user = new User(newUser);
         user.save();
         return user;
     } catch (error) {
         console.log(error);
     }
};

async function login(input){
    const { email, password } = input;

    const userFound = await User.findOne({ email: email.toLowerCase()  });
    if(!userFound) throw new Error( "Email or password incorrect!" );
    
    const passwordSuccess = await bcryptjs.compare(password, userFound.password);
    if(!passwordSuccess) throw new Error( "Email or password incorrect!" );
    console.log( process.env.SECRET_KEY )
    console.log(createToken(userFound, process.env.SECRET_KEY , "1h"))

    return {
        token: createToken(userFound, process.env.SECRET_KEY , "1h")
    }
}
module.exports = {
    register,
    login,
}
