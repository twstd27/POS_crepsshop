const { response } = require("express");

const Mesa = require("../models/mesa");

const obtenerMesas = async (req, res = response) => {
  const [mesas] = await Promise.all([Mesa.find().sort({ _id: 1 })]);

  res.json({
    mesas,
  });
};

const obtenerMesa = async (req, res = response) => {
  const { id } = req.params;
  const mesa = await Mesa.findById(id);

  res.json(mesa);
};

const crearMesa = async (req, res = response) => {
  const { mesa } = req.body;

  const data = {
    numero: mesa.numero,
    sucursal: mesa.sucursal,
    ubicacion: mesa.ubicacion,
    capacidad: mesa.capacidad,
    notas: mesa.notas,
    estado: mesa.estado,
  };

  const nuevaMesa = new Mesa(data);

  await nuevaMesa.save();

  res.status(201).json({
    nuevaMesa,
  });
};

const actualizarMesa = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const mesa = await Mesa.findByIdAndUpdate(id, data);

  res.json(mesa);
};

const borrarMesa = async (req, res = response) => {
  const { id } = req.params;
  const mesa = await Mesa.findByIdAndUpdate(id, { estado: false });

  res.json(mesa);
};

module.exports = {
  crearMesa,
  obtenerMesas,
  obtenerMesa,
  actualizarMesa,
  borrarMesa,
};
