export type Message = {
  content: string;
  sender: string;
  recipient: string;
  timestamp: string;
};

export type MessageQueryInput = {
  sender?: string;
  recipient?: string;
  allMessages?: boolean;
};

export type SendMessageInput = {
  sender: string;
  recipient: string;
  content: string;
};