export const MESSAGES_QUERY = `
  query {
    messages {
      timestamp
      sender
      recipient
      content
    }
  }
`;