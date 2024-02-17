const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    nombreUsuario: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    rol: {
      type: String,
      required: true,
      default: "EMPLEADO",
      emun: ["ADMIN", "ENCARGADO", "EMPLEADO"],
    },
    nombres: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    primerApellido: {
      type: String,
      required: [true, "El apellido paterno es obligatorio"],
    },
    segundoApellido: {
      type: String,
      default: null,
    },
    fechaNacimiento: {
      type: Date,
      default: null,
    },
    correo: {
      type: String,
      default: null,
    },
    telefono: {
      type: String,
      default: null,
    },
    sucursales: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sucursal",
      },
    ],
    img: {
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

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
