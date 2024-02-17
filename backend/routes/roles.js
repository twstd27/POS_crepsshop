const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  crearRol,
  obtenerRoles,
  obtenerRol,
  actualizarRol,
  borrarRol,
} = require("../controllers/roles");

const { existeRolPorId } = require("../helpers/db-validators");

const router = Router();

//  Obtener todos
router.get("/", obtenerRoles);

// Obtener uno
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeRolPorId),
    validarCampos,
  ],
  obtenerRol
);

// Crear - privado - solo admins
router.post("/", [esAdmin, validarJWT, validarCampos], crearRol);

// Actualizar - privado - solo admins
router.put(
  "/:id",
  [esAdmin, validarJWT, check("_id").custom(existeRolPorId), validarCampos],
  actualizarRol
);

// Borrar - privado - solo admins
router.delete(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeRolPorId),
  ],
  borrarRol
);

module.exports = router;
