import * as utils from '../utils';
import {JSONMessages} from '../dataSources/JSONMessages';
import {complexDatabaseResponse, newMessage, oldMessage, simpleDatabaseResponse} from './mockData';

describe('getMessages method', () => {
  const readFromDBSpy = jest.spyOn(utils, "readFromJSONDatabase");
  const JSONMessagesInstance = new JSONMessages();

  describe('length filter', () => {
    readFromDBSpy.mockImplementationOnce(async () => {
      return complexDatabaseResponse;
    });

    it('should only return 100 messages when allMessages is false', async () => {
      const result = await JSONMessagesInstance.getMessages({ allMessages: false });
      expect(result.length).toEqual(100);
    });
  });

  describe('date filter', () => {
    readFromDBSpy.mockImplementation(async () => {
      return simpleDatabaseResponse;
    });

    it('should filter out messages more than 30 days old when allMessages is true', async () => {
      const result = await JSONMessagesInstance.getMessages({ allMessages: true });
      expect(result).toEqual([newMessage]);
    });

    it('should not filter out messages more than 30 days old when allMessages is false', async () => {
      const result = await JSONMessagesInstance.getMessages({ allMessages: false });
      expect(result).toEqual(simpleDatabaseResponse);
    });
  });

  describe('sender and recipient filters', () => {
    readFromDBSpy.mockImplementation(async () => {
      return simpleDatabaseResponse;
    });

    it('should only return messages from specified sender', async () => {
      const result = await JSONMessagesInstance.getMessages({ sender: 'Patrick', allMessages: false });
      expect(result).toEqual([oldMessage]);
    });

    it('should return no messages if the specified sender is not present in the database', async () => {
      const result = await JSONMessagesInstance.getMessages({ sender: 'Spongebob', allMessages: false });
      expect(result).toEqual([]);
    });

    it('should only return messages sent to the specified recipient', async () => {
      const result = await JSONMessagesInstance.getMessages({ recipient: 'Steward', allMessages: false });
      expect(result).toEqual([newMessage]);
    });

    it('should return no messages if the specified recipient is not present in the database', async () => {
      const result = await JSONMessagesInstance.getMessages({ recipient: 'Patrick', allMessages: false });
      expect(result).toEqual([]);
    });
  });

  readFromDBSpy.mockClear();
});

describe('sendMessage method', () => {
  const writeToDBSpy = jest.spyOn(utils, 'writeToJSONDatabase');
  writeToDBSpy.mockImplementation(async (message) => {});

  const now = new Date();

  const JSONMessagesInstance = new JSONMessages();
  it('should add current timestamp to the input message and then write to the database', async () => {
    const message = { sender: 'Juliet', recipient: 'Romeo', content: 'Wherefore art thou?' };
    const result = await JSONMessagesInstance.sendMessage({ message });
    expect(new Date(result.timestamp).getTime() - now.getTime()).toBeLessThan(1000);
  });

  writeToDBSpy.mockClear();
});
