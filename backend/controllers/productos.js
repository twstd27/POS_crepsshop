const { response } = require("express");

const Producto = require("../models/producto");

const obtenerProductos = async (req, res = response) => {
  const [productos] = await Promise.all([Producto.find().sort({ _id: 1 })]);

  res.json({
    productos,
  });
};

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const { producto } = req.body;

  const data = {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    categorias: producto.categorias,
    disponibilidad: producto.disponibilidad,
    img: producto.img,
  };

  const nuevoProducto = new Producto(data);

  await nuevoProducto.save();

  res.status(201).json({
    nuevoProducto,
  });
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const producto = await Producto.findByIdAndUpdate(id, data);

  res.json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(id, { estado: false });

  res.json(producto);
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
