const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  crearMesa,
  obtenerMesas,
  obtenerMesa,
  actualizarMesa,
  borrarMesa,
} = require("../controllers/mesas");

const { existeMesaPorId } = require("../helpers/db-validators");

const router = Router();

//  Obtener todas las mesas - publico
router.get("/", obtenerMesas);

// Obtener una mesa por id - publico
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeMesaPorId),
    validarCampos,
  ],
  obtenerMesa
);

// Crear Mesa - privado - solo admins
router.post("/", [esAdmin, validarJWT, validarCampos], crearMesa);

// Actualizar - privado - solo admins
router.put(
  "/:id",
  [esAdmin, validarJWT, check("_id").custom(existeMesaPorId), validarCampos],
  actualizarMesa
);

// Borrar - privado - solo admins
router.delete(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeMesaPorId),
  ],
  borrarMesa
);

module.exports = router;
