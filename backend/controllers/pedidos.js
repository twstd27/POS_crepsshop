const { response } = require("express");

const Pedido = require("../models/pedido");

const obtenerPedidos = async (req, res = response) => {
  const [pedidos] = await Promise.all([Pedido.find().sort({ _id: 1 })]);

  res.json({
    pedidos,
  });
};

const obtenerPedido = async (req, res = response) => {
  const { id } = req.params;
  const pedido = await Pedido.findById(id);

  res.json(pedido);
};

const crearPedido = async (req, res = response) => {
  const { pedido } = req.body;

  const data = {
    fechaHora: pedido.fechaHora,
    descripcion: pedido.descripcion,
    detalle: pedido.detalle,
    total: pedido.total,
    metodoPago: pedido.metodoPago,
    metodoEntrega: pedido.metodoEntrega,
    observaciones: pedido.observaciones,
    empleado: pedido.empleado,
    mesa: pedido.mesa,
    estado: pedido.estado,
  };

  const nuevoPedido = new Pedido(data);

  await nuevoPedido.save();

  res.status(201).json({
    nuevoPedido,
  });
};

const actualizarPedido = async (req, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const pedido = await Pedido.findByIdAndUpdate(id, data);

  res.json(pedido);
};

const borrarPedido = async (req, res = response) => {
  const { id } = req.params;
  const pedido = await Pedido.findByIdAndUpdate(id, { estado: false });

  res.json(pedido);
};

module.exports = {
  obtenerPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  borrarPedido,
};
