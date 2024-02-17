const { Schema, model } = require("mongoose");

const PedidoSchema = new Schema({
  fechaHora: { type: Date, default: Date.now },
  estado: {
    type: String,
    enum: [
      "pendiente",
      "en preparacion",
      "completado",
      "entregado",
      "cancelado",
    ],
    default: "pendiente",
  },
  detalle: [
    {
      producto: { type: Schema.Types.ObjectId, ref: "Producto" },
      cantidad: { type: Number, default: 1 },
      precioUnitario: { type: Number },
      subtotal: { type: Number },
      notas: { type: String },
    },
  ],
  total: { type: Number, required: true, min: 0 },
  metodoPago: {
    type: String,
    enum: ["efectivo", "tarjeta", "transferencia", "qr"],
    required: true,
  },
  metodoEntrega: {
    type: String,
    enum: ["local", "para llevar", "entrega a domicilio"],
    required: true,
  },
  observaciones: { type: String },
  empleado: { type: Schema.Types.ObjectId, ref: "Empleado" },
  mesa: { type: Schema.Types.ObjectId, ref: "Mesa" },
});

PedidoSchema.methods.toJSON = function () {
  const { __v, ...pedido } = this.toObject();
  return pedido;
};

module.exports = model("Pedido", PedidoSchema);
