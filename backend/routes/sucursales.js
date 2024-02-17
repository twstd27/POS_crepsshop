const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  crearSucursal,
  obtenerSucursales,
  obtenerSucursal,
  actualizarSucursal,
  borrarSucursal,
} = require("../controllers/sucursales");

const { existeSucursalPorId } = require("../helpers/db-validators");

const router = Router();

//  Obtener todos
router.get("/", obtenerSucursales);

// Obtener uno
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeSucursalPorId),
    validarCampos,
  ],
  obtenerSucursal
);

// Crear - privado - solo admins
router.post("/", [esAdmin, validarJWT, validarCampos], crearSucursal);

// Actualizar - privado - solo admins
router.put(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("_id").custom(existeSucursalPorId),
    validarCampos,
  ],
  actualizarSucursal
);

// Borrar - privado - solo admins
router.delete(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeSucursalPorId),
  ],
  borrarSucursal
);

module.exports = router;
