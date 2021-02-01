const now = new Date();
const twoMonthsOld = new Date();
twoMonthsOld.setDate(twoMonthsOld.getDate() - 60);

export const oldMessage = {
  "timestamp": twoMonthsOld.toISOString(),
  "sender": "Patrick",
  "recipient": "Spongebob",
  "content": "Testing... testing testing testing TESTing... TESTING!!"
};

export const newMessage = {
  "timestamp": now.toISOString(),
  "sender": "Countess",
  "recipient": "Steward",
  "content": "I will now hear; what say you of this gentlewoman?"
};

export const simpleDatabaseResponse = [oldMessage, newMessage];

let longDatabaseResponse = [];
for (let i = 0; i < 200; i++) {
  if (i % 2) {
    longDatabaseResponse.push(oldMessage);
  } else {
    longDatabaseResponse.push(newMessage);
  }
}
export const complexDatabaseResponse = longDatabaseResponse;
