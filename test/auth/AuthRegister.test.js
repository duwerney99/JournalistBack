const AuthRegisterService = require('../../../Journalist/src/services/auth/AuthRegisterService');
const AuthRepository = require('../../../Journalist/src/repositories/AuthRepository');
const encrypt = require('../../src/utils/bcrypt');

jest.mock('../../../Journalist/src/repositories/AuthRepository');
jest.mock('../../src/utils/bcrypt');

describe('AuthRegisterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería registrar un usuario encriptando la contraseña', async () => {
    // Arrange
    const mockUser = { email: 'test@example.com', password: '123456', name: 'Test User' };
    const encryptedPassword = '12345';
    const dateMock = new Date('2025-04-28T00:00:00Z');

    encrypt.encrypt.mockResolvedValue(encryptedPassword);
    AuthRepository.registerUser.mockResolvedValue({ id: 1, email: mockUser.email, name: mockUser.name });

    // Para evitar que Date() sea variable, puedes usar jest.spyOn si quieres congelarlo (opcionalmente)
    jest.spyOn(global, 'Date').mockImplementation(() => dateMock);

    // Act
    const result = await AuthRegisterService.execute(mockUser);

    // Assert
    expect(encrypt.encrypt).toHaveBeenCalledWith('123456');
    expect(AuthRepository.registerUser).toHaveBeenCalledWith(dateMock, encryptedPassword, mockUser);
    expect(result).toEqual({ id: 1, email: 'test@example.com', name: 'Test User' });
  });

  it('debería lanzar error si algo falla en el registro', async () => {
    // Arrange
    const mockUser = { email: 'test@example.com', password: '123456', name: 'Test User' };
    encrypt.encrypt.mockResolvedValue('hashedPassword123');
    AuthRepository.registerUser.mockRejectedValue(new Error('Error de registro'));

    // Act & Assert
    await expect(AuthRegisterService.execute(mockUser)).rejects.toThrow('Error de registro');
  });
});
