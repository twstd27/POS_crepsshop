const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

//  Obtener todos
router.get("/", obtenerCategorias);

// Obtener uno
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear - privado - solo admins
router.post("/", [esAdmin, validarJWT, validarCampos], crearCategoria);

// Actualizar - privado - solo admins
router.put(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("_id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar - privado - solo admins
router.delete(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
  ],
  borrarCategoria
);

module.exports = router;
