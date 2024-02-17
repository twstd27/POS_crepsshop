const { response } = require("express");

const esAdmin = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

const esPropietario = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  const { _id } = req.usuario;
  const { id } = req.params;
  if (_id != id) {
    return res.status(401).json({
      msg: `No tiene autorización para realizar la acción solicitada`,
    });
  }
  next();
};

const esAdminOPropietario = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { _id, rol } = req.usuario;
  const { id } = req.params;

  const validacion = {
    propietario: false,
    admin: false,
  };

  validacion.propietario = _id == id ? true : false;
  validacion.admin = rol === "ADMIN" ? true : false;

  if (!validacion.admin && !validacion.propietario) {
    return res.status(401).json({
      msg: `No tiene autorización para realizar la acción solicitada`,
    });
  }

  next();
};
module.exports = {
  esAdmin,
  esAdminOPropietario,
  esPropietario,
  tieneRol,
};
