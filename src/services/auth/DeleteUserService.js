
class DeleteUserService {

    static async execute(userId) {
        try {
            await usuarioRepositorio.eliminarUsuario(userId);
            return { message: "Usuario eliminado correctamente" };
          } catch (error) {
            console.error("Error eliminando usuario:", error.message);
            throw error;
          }
    }
}

module.exports = DeleteUserService;