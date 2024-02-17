const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const {
  crearPedido,
  obtenerPedidos,
  obtenerPedido,
  actualizarPedido,
  borrarPedido,
} = require("../controllers/pedidos");

const { existePedidoPorId } = require("../helpers/db-validators");

const router = Router();

//  Obtener todos los pedidos - publico
router.get("/", obtenerPedidos);

// Obtener un Pedido por id - publico
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existePedidoPorId),
    validarCampos,
  ],
  obtenerPedido
);

// Crear - privado - solo admins
router.post("/", [esAdmin, validarJWT, validarCampos], crearPedido);

// Actualizar - privado - solo admins
router.put(
  "/:id",
  [esAdmin, validarJWT, check("_id").custom(existePedidoPorId), validarCampos],
  actualizarPedido
);

// Borrar - privado - solo admins
router.delete(
  "/:id",
  [
    esAdmin,
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existePedidoPorId),
  ],
  borrarPedido
);

module.exports = router;
