const {
  Usuario,
  Categoria,
  Producto,
  Mesa,
  Pedido,
  Rol,
} = require("../models");

const esRolValido = async (rol = "EMPLEADO") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Categorias
 */
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Mesas
 */
const existeMesaPorId = async (id) => {
  const existeMesa = await Mesa.findById(id);
  if (!existeMesa) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Pedidos
 */
const existePedidoPorId = async (id) => {
  const existePedido = await Pedido.findById(id);
  if (!existePedido) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Productos
 */
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Roles
 */
const existeRolPorId = async (id) => {
  const existeRol = await Rol.findById(id);
  if (!existeRol) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Sucursales
 */
const existeSucursalPorId = async (id) => {
  const existeSucursal = await Sucursal.findById(id);
  if (!existeSucursal) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeMesaPorId,
  existePedidoPorId,
  existeProductoPorId,
  existeRolPorId,
  existeSucursalPorId,
  coleccionesPermitidas,
};
