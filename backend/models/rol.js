const { Schema, model } = require("mongoose");

const RoleSchema = Schema(
  {
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
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

module.exports = model("Rol", RoleSchema);
