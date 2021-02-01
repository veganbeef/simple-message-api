import { IResolvers } from 'graphql-tools';

import { JSONMessages } from '../dataSources/JSONMessages';
import { Message, MutationSendMessageArgs, QueryMessagesArgs } from './schema-types';


const resolvers: IResolvers = {
  Query: {
    messages: async (parent: any, args: QueryMessagesArgs): Promise<Message[]> => {
      return new JSONMessages().getMessages(args);
    }
  },
  Mutation: {
    sendMessage: async (parent: any, args: MutationSendMessageArgs): Promise<Message> => {
      return new JSONMessages().sendMessage(args);
    }
  }
};

export default resolvers;
