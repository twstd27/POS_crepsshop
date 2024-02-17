const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  // esAdmin,
  esAdminOPropietario,
  // tieneRol,
  // esPropietario
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuarioGet,
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

// const { getVehiculoPorUsuario, getVehiculosInactivosPorUsuario } = require('../controllers/vehiculos');
// const { getTarjetasPorUsuario } = require('../controllers/tarjetas');
// const { getRegistrosPorUsuario, getRegistrosPorUsuarioPorZona } = require('../controllers/registros');

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    esAdminOPropietario,
    validarCampos,
  ],
  usuarioGet
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener 6 o más caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    // esAdminOPropietario,
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminOPropietario,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

// router.get('/:id/vehiculos',[
//     validarJWT,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     esPropietario,
//     validarCampos,
// ], getVehiculoPorUsuario );

// router.get('/:id/vehiculosinactivos',[
//     validarJWT,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     esPropietario,
//     validarCampos,
// ], getVehiculosInactivosPorUsuario );

// router.get('/:id/tarjetas',[
//     validarJWT,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     esPropietario,
//     validarCampos,
// ], getTarjetasPorUsuario );

// router.get('/:id/registros',[
//     validarJWT,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     esPropietario,
//     validarCampos,
// ], getRegistrosPorUsuario );

// router.get('/:id/registros/:idZona',[
//     validarJWT,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     esPropietario,
//     validarCampos,
// ], getRegistrosPorUsuarioPorZona );

// router.patch('/', usuariosPatch );

module.exports = router;
