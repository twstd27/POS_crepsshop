const { Schema, model } = require("mongoose");

const ProductoSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      default: null,
    },
    precio: {
      type: Number,
      default: 0,
      min: 0,
    },
    categorias: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
      },
    ],
    disponibilidad: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ProductoSchema.methods.toJSON = function () {
  const { __v, ...producto } = this.toObject();
  return producto;
};

module.exports = model("Producto", ProductoSchema);
