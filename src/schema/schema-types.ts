export type Message = {
  content: string;
  sender: string;
  recipient: string;
  timestamp: string;
};

export type QueryMessagesArgs = {
  sender?: string;
  recipient?: string;
  allMessages: boolean;
};

export type SendMessageInput = {
  sender: string;
  recipient: string;
  content: string;
};

export type MutationSendMessageArgs = {
  message: SendMessageInput;
};
