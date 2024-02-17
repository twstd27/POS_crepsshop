const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
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

CategoriaSchema.methods.toJSON = function () {
  const { __v, ...categoria } = this.toObject();
  return categoria;
};

module.exports = model("Categoria", CategoriaSchema);
