const { response } = require("express");

const Categoria = require("../models/categoria");

const obtenerCategorias = async (req, res = response) => {
  const [categorias] = await Promise.all([Categoria.find().sort({ _id: 1 })]);

  res.json({
    categorias,
  });
};

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const { categoria } = req.body;

  const data = {
    nombre: categoria.nombre,
    descripcion: categoria.descripcion,
    estado: categoria.estado,
  };

  const nuevaCategoria = new Categoria(data);

  await nuevaCategoria.save();

  res.status(201).json({
    nuevaCategoria,
  });
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const categoria = await Categoria.findByIdAndUpdate(id, data);

  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

  res.json(categoria);
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
