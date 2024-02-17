const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers");

const usuarioGet = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  const data = {
    usuario,
  };
  res.json(data);
};

const usuariosGet = async (req = request, res = response) => {
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().sort("-createdAt"),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombreUsuario, password, rol, estado, img } = req.body;

  const usuario = new Usuario({
    nombreUsuario,
    password,
    rol,
    estado,
    img,
  });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  // Generar el JWT
  const token = await generarJWT(usuario.id);

  res.json({
    usuario,
    token,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;

  if (data.password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, data);

  res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuarioGet,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
