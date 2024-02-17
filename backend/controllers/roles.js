const { response } = require("express");

const Rol = require("../models/rol");

const obtenerRoles = async (req, res = response) => {
  const [roles] = await Promise.all([Rol.find().sort({ _id: 1 })]);

  res.json({
    roles,
  });
};

const obtenerRol = async (req, res = response) => {
  const { id } = req.params;
  const rol = await Rol.findById(id);

  res.json(rol);
};

const crearRol = async (req, res = response) => {
  const { rol } = req.body;

  const data = {
    descripcion: rol.descripcion,
    estado: rol.estado,
  };

  const nuevoRol = new Rol(data);

  await nuevoRol.save();

  res.status(201).json({
    nuevoRol,
  });
};

const actualizarRol = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const rol = await Rol.findByIdAndUpdate(id, data);

  res.json(rol);
};

const borrarRol = async (req, res = response) => {
  const { id } = req.params;
  const rol = await Rol.findByIdAndUpdate(id, { estado: false });

  res.json(rol);
};

module.exports = {
  obtenerRoles,
  obtenerRol,
  crearRol,
  actualizarRol,
  borrarRol,
};
