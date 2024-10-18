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
    const userData = await model.findUserById(userFound.persona_id);
    console.log(userData);

    const token = await createAcessToken({ id: userData.id });
    res.cookie("token", token);

    res.json({
      id: userData.id,
      nombres: userData.nombres,
      apellido_paterno: userData.apellido_paterno,
      apellido_materno: userData.apellido_materno,
      correo_institucional: userData.correo_institucional,
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
    const userFound = await model.findUserById(user.id);
    if (!userFound) return res.status(401).json({ message: "Token invalido" });
    return res.json({
      id: userFound.id,
      nombres: userFound.nombres,
      apellido_paterno: userFound.apellido_paterno,
      apellido_materno: userFound.apellido_materno,
      correo_institucional: userFound.correo_institucional,
    });
  });
};

controllers.logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export default controllers;
