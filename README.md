# Simple Messenger API
This is a basic GraphQL API written in TypeScript that provides the ability to send and query messages. It uses a locally stored JSON file as a simple database.
(I realize that the simplicity of this project means that there are no real benefits to using GraphQL over REST, but I just went with the technologies that I know best.)

## Quickstart
To run a local development server, execute the following commands:
```
npm install
npm run start:dev
```

To run a local production server, execute the following commands:
```
npm install
npm run build
npm run start
```

For both the development and production servers, after executing the above commands, the GraphQL playground will be available at http://localhost:3000/graphql.

_(For optimal performance, please ensure you're using Node version 12. If you use nodenv, the local node version will be automatically set by the .node-version file.)_

To run unit tests, execute `npm test`.

## Documentation
This API supports two operations: the `messages` query and the `sendMessage` mutation.
Both operations return a `Message` object (or an array of `Message` objects, in the case of the `messages` query), which has the following fields: _sender_, _recipient_, _content_, and _timestamp_.
Per the GraphQL standard, each operation must select at least one of these fields in the response type.

### Messages Query
To query the local database for available messages, use the `messages` query. All arguments are optional.

**Arguments**
 - `sender` is an optional string value used to filter all available messages by sender
 - `recipient` is an optional string value used to filer all available messages by recipient
 - `allMessages` is an optional boolean value (defaults to `false`) that determines how many messages are returned; if true, all messages from the last 30 days (that satisfy the other filters) are returned; if false, only the 100 most recent messages are returned

**Examples**
```
query {
  messages(sender: 'Jules', recipient: 'Brett', allMessages: true) {
    content
    timestamp
  }
}
```

_To query without any arguments, simply remove the parentheses:_
```
query {
  messages {
    sender
    recipient
    content
    timestamp
  }
}
```

### SendMessage Mutation
To add a message to the local database, use the `sendMessage` mutation. The mutation takes one `message` argument, which is mandatory, and which must contain three mandatory subfields.

**Subfields**
 - `sender` is a string value representing the name of the sender of the message
 - `recipient` is a string value representing the name of the recipient of the message
 - `content` is a string value representing the actual message text

**Example**
```
mutation {
  sendMessage(message: {sender: "Lucas", recipient: "World", content: "Hello, world!"}) {
    timestamp
    content
  }
}
```

## to do
* create SQLite database to replace JSON database
* implement subclass of SQLDataSource to connect to SQLite database
* add schema-type automatic generation with `graphql-codegen` tool
* implement GraphQL subscription to push chat updates to client
* plan for multiple simultaneous writes using a queue
