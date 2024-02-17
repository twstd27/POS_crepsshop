const { Schema, model } = require("mongoose");

const MesaSchema = Schema(
  {
    numero: {
      type: Number,
      required: [true, "El número es obligatorio"],
    },
    sucursal: {
      type: Schema.Types.ObjectId,
      ref: "Sucursal",
    },
    ubicacion: {
      type: String,
      default: null,
    },
    capacidad: {
      type: Number,
      required: [true, "la capacidad es obligatoria"],
    },
    estado: {
      type: String,
      enum: ["disponible", "ocupada", "reservada", "fuera de servicio"],
      default: "disponible",
    },
    notas: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

MesaSchema.methods.toJSON = function () {
  const { __v, ...mesa } = this.toObject();
  return mesa;
};

module.exports = model("Mesa", MesaSchema);
