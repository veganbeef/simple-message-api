import { Message, MutationSendMessageArgs, QueryMessagesArgs } from '../schema/schema-types';
import { readFromJSONDatabase, writeToJSONDatabase } from '../utils';


/**
 * Data source class for reading from and writing to the locally stored JSON database file
 */
export class JSONMessages {
  /**
   * Resolver method to query messages from the JSON database and apply filters as specified by the arguments.
   */
  public async getMessages(args: QueryMessagesArgs): Promise<Message[]> {
    let allMessages = await readFromJSONDatabase();

    if (args.sender) {
      allMessages = allMessages.filter(message => message.sender === args.sender);
    }
    if (args.recipient) {
      allMessages = allMessages.filter(message => message.recipient === args.recipient);
    }

    if (args.allMessages) {
      const cutoff = new Date();
      cutoff.setDate(new Date().getDate() - 30);
      return allMessages.filter(message => new Date(message.timestamp) >= cutoff);
    } else {
      allMessages.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB.getTime() - dateA.getTime();
      });
      return allMessages.slice(0, 100);
    }
  }

  /**
   * Resolver method to write a single message to the JSON database using the current time as the timestamp.
   * As a sanity check, and also to limit excess queries to the API, this method returns the message that was just
   * written to the database.
   */
  public async sendMessage(args: MutationSendMessageArgs): Promise<Message> {
    const newMessage: Message = {...args.message, timestamp: new Date().toISOString()};
    // awaiting to prevent data loss from multiple simultaneous write operations (does this actually work though?)
    await writeToJSONDatabase(newMessage);
    return newMessage;
  }
}