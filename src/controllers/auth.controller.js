const controllers = {};
import { TOKEN_SECRET } from "../config/config.js";
import { createAcessToken } from "../libs/jwt.js";
import model from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

controllers.register = async (req, res) => {
  const { username, password, idPers } = req.body;
  try {
    const newPassword = await bcrypt.hash(password, 10);
    res.status(200).send({ password: newPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controllers.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await model.findUser(username);
    console.log(userFound);

    if (!userFound)
      return res
        .status(401)
        .json({ message: "Usuario y/o contraseña incorrecto" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Usuario y/o contraseña incorrecto" });

    console.log("Usuario logueado correctamente");
    const userData = await model.findUserById(userFound.idPers);
    console.log(userData);

    const token = await createAcessToken({ idPers: userData.idPers });
    res.cookie("token", token);

    res.json({
      idPers: userData.idPers,
      nombre: userData.nombre,
      apePaterno: userData.apePaterno,
      apeMaterno: userData.apeMaterno,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controllers.verify = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.status(401).json({ message: "Autorización denegada" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    console.log(user);
    if (err) return res.status(403).json({ message: "Autorización denegada" });
    const userFound = await model.findUserById(user.idPers);
    if (!userFound) return res.status(401).json({ message: "Token invalido" });
    return res.json({
      idPers: userFound.idPers,
      nombre: userFound.nombre,
      apePaterno: userFound.apePaterno,
      apeMaterno: userFound.apeMaterno,
    });
  });
};

controllers.logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendstatus(200);
};

export default controllers;
