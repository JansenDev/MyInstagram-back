// Implementacion(resolvers) de las consultas de typeDefs
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsUploadImage = require("../utils/aws-upload-image");

function createToken(user, SECRET_KEY, expiresIn) {
  const { id, name, email, username } = user;

  const payload = {
    id,
    name,
    email,
    username,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;

  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email ingresado ya registrado");

  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("El username ingresado ya existe.");

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
}

async function login(input) {
  const { email, password } = input;

  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Email or password incorrect!");

  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Email or password incorrect!");

  return {
    token: createToken(userFound, process.env.SECRET_KEY, "1h"),
  };
}

async function getUser(id, username) {
  let user;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });
  if (!user) throw new Error("El usuario no existe");

  return user;
}

async function updateAvatar(file, ctx) {
  // console.log(ctx);
  const idUser = ctx.user.id;
  const { createReadStream, mimetype } = await file;

  const filExtension = mimetype.split("/")[1];
  const imageName = `avatar/${idUser}.${filExtension}`;
  //   console.log(createReadStream);
  const fileData = createReadStream(); //Error solucionado al instalar la libreria graphql-update

  try {
    const urlImageAWS = await awsUploadImage(fileData, imageName);
    // console.log(urlImageAWS);

    await User.findByIdAndUpdate(idUser, { avatar: urlImageAWS });

    return {
      status: true,
      urlAvatar: urlImageAWS,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}

async function deleteAvatar(ctx) {
  const { id } = ctx.user ;

  try {
    await User.findByIdAndUpdate(id, { avatar:""});
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
}

module.exports = {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
};
