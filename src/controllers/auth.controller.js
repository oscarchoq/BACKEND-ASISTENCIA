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

    if (!userFound)
      return res
        .status(401)
        .json({ message: "Usuario y/o contraseña incorrectos" });

    if (userFound.Activo === 0)
      return res
        .status(401)
        .json({ message: "Usuario y/o contraseña incorrectos" });

    const isMatch = await bcrypt.compare(password, userFound.Password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Usuario y/o contraseña incorrectos" });

    console.log("Usuario logueado correctamente");
    console.log(userFound);

    const userData = await model.findUserById(userFound.PersonaID);
    console.log(userData);

    const token = await createAcessToken(userData);
    res.cookie("token", token);
    res.json(userData);
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
    const userFound = await model.findUserById(user.PersonaID);
    if (!userFound) return res.status(401).json({ message: "Token invalido" });
    return res.json(userFound);
  });
};

controllers.logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export default controllers;
