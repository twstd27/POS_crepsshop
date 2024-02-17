const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const { existeProductoPorId } = require("../helpers/db-validators");

const router = Router();

//  Obtener todos
router.get("/", obtenerProductos);

// Obtener uno
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// Crear - privado - solo admins
router.post("/", [esAdmin, validarJWT, validarCampos], crearProducto);

// Actualizar - privado - solo admins
router.put(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("_id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar - privado - solo admins
router.delete(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
  ],
  borrarProducto
);

module.exports = router;
