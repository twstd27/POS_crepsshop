const { response } = require("express");

const Sucursal = require("../models/sucursal");

const obtenerSucursales = async (req, res = response) => {
  const [sucursales] = await Promise.all([Sucursal.find().sort({ _id: 1 })]);

  res.json({
    sucursales,
  });
};

const obtenerSucursal = async (req, res = response) => {
  const { id } = req.params;
  const sucursal = await Sucursal.findById(id);

  res.json(sucursal);
};

const crearSucursal = async (req, res = response) => {
  const { sucursal } = req.body;

  const data = {
    nombre: sucursal.nombre,
    direccion: sucursal.direccion,
    telefono: sucursal.telefono,
    estado: sucursal.estado,
  };

  const nuevaSucursal = new Sucursal(data);

  await nuevaSucursal.save();

  res.status(201).json({
    nuevaSucursal,
  });
};

const actualizarSucursal = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const sucursal = await Sucursal.findByIdAndUpdate(id, data);

  res.json(sucursal);
};

const borrarSucursal = async (req, res = response) => {
  const { id } = req.params;
  const sucursal = await Sucursal.findByIdAndUpdate(id, { estado: false });

  res.json(sucursal);
};

module.exports = {
  obtenerSucursales,
  obtenerSucursal,
  crearSucursal,
  actualizarSucursal,
  borrarSucursal,
};
