import { IResolvers } from 'graphql-tools';

import { Message, MessagesQueryArgs, SendMessageInput } from './schema-types';


const resolvers: IResolvers = {
  Query: {
    messages: async (parent: any, args: MessagesQueryArgs): Promise<Message[]> => {
      return [{content: 'test', recipient: 'me', sender: 'you', timestamp: new Date().toISOString()}];
    }
  },
  Mutation: {
    sendMessage: async (parent: any, args: { message: SendMessageInput }): Promise<Message> => {
      return { ...args.message, timestamp: new Date().toISOString() }
    }
  }
};

export default resolvers;
