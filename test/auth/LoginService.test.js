const LoginService = require('../../../Journalist/src/services/auth/LoginService');
const { getConnection } = require('../../../Journalist/src/config/dbSql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../../Journalist/src/config/dbSql');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('LoginService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ACCESS_TOKEN_SECRET = 'mocked_secret'; 
  });

  it('debería generar un token exitosamente si el login es correcto', async () => {
    const mockUser = { email: 'santiago@gmail.com', password: '123456' };
    const dbUser = { id: 1, name: 'Santiago', email: 'santiago@gmail.com', password: '123456' };

    const mockConnection = {
      query: jest.fn().mockResolvedValue({ rows: [dbUser] }),
    };
    getConnection.mockResolvedValue(mockConnection);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked_token');

    const result = await LoginService.generateToken(mockUser);

    expect(getConnection).toHaveBeenCalled();
    expect(mockConnection.query).toHaveBeenCalledWith(
      'SELECT id, name, email, password FROM public.users WHERE email = $1',
      [mockUser.email]
    );
    expect(bcrypt.compare).toHaveBeenCalledWith(mockUser.password, dbUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: dbUser.id, name: dbUser.name },
      'mocked_secret',
      { expiresIn: '60m' }
    );
    expect(result).toBe('mocked_token');
  });

  it('debería lanzar error si el usuario no existe', async () => {
    const mockUser = { email: 'santiago@gmail.com', password: '123456' };

    const mockConnection = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    getConnection.mockResolvedValue(mockConnection);

    await expect(LoginService.generateToken(mockUser)).rejects.toThrow('Email o contraseña incorrectos');
  });

  it('debería lanzar error si la contraseña es incorrecta', async () => {
    const mockUser = { email: 'santiago@gmail.com', password: '123456' };
    const dbUser = { id: 1, name: 'Santiago', email: 'santiago@gmail.com', password: '123456' };

    const mockConnection = {
      query: jest.fn().mockResolvedValue({ rows: [dbUser] }),
    };
    getConnection.mockResolvedValue(mockConnection);
    bcrypt.compare.mockResolvedValue(false); 

    await expect(LoginService.generateToken(mockUser)).rejects.toThrow('Email o contraseña incorrectos');
  });

  it('debería lanzar error si falta la variable ACCESS_TOKEN_SECRET', async () => {
    delete process.env.ACCESS_TOKEN_SECRET; 

    const mockUser = { email: 'santiago@gmail.com', password: '123456' };
    const dbUser = { id: 1, name: 'Santiago', email: 'santiago@gmail.com', password: '123456' };

    const mockConnection = {
      query: jest.fn().mockResolvedValue({ rows: [dbUser] }),
    };
    getConnection.mockResolvedValue(mockConnection);
    bcrypt.compare.mockResolvedValue(true);

    await expect(LoginService.generateToken(mockUser)).rejects.toThrow('Las claves secretas no están definidas.');
  });
});
