const { Schema, model } = require("mongoose");

const SucursalSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    direccion: {
      type: String,
      default: null,
    },
    telefono: {
      type: String,
      default: null,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

SucursalSchema.methods.toJSON = function () {
  const { __v, ...sucursal } = this.toObject();
  return sucursal;
};

module.exports = model("Sucursal", SucursalSchema);
