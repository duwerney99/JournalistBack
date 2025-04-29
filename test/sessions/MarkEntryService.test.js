const MarkEntryService = require('../../../Journalist/src/services/sessions/MarkEntryService');
const Session = require('../../../Journalist/src/models/session/SessionModel');

jest.mock('../../../Journalist/src/models/session/SessionModel'); 

describe('MarkEntryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería registrar una nueva entrada si no existe sesión para la fecha', async () => {
    const userId = 1;
    const date = '2025-04-28';
    const entryTime = '08:00';

    Session.findOne.mockResolvedValue(null);

    const mockSession = { userId, date, entryTime, save: jest.fn() };
    Session.mockImplementation(() => mockSession);

    const result = await MarkEntryService.execute(userId, date, entryTime);

    expect(Session.findOne).toHaveBeenCalledWith({ userId, date });
    expect(mockSession.save).toHaveBeenCalled();
    expect(result).toEqual(mockSession);
  });

  it('debería lanzar error si ya existe una sesión para esa fecha', async () => {

    const userId = 1;
    const date = '2025-04-28';
    const entryTime = '08:00';

    Session.findOne.mockResolvedValue({ _id: 'existingSessionId' }); 

    await expect(MarkEntryService.execute(userId, date, entryTime))
      .rejects
      .toThrow('Ya existe un registro de entrada para esta fecha');
  });
});
