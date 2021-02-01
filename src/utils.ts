import { promises as fsPromises } from 'fs';
import { join } from 'path';

import { Message } from './schema/schema-types';


/**
 * Util method to read the entire database.json file and parse it into an array of Message objects
 */
export async function readFromJSONDatabase(): Promise<Message[]> {
  const dbString = await fsPromises.readFile(join(__dirname, 'database.json'), { encoding: 'utf-8' });
  return JSON.parse(dbString);
}

/**
 * Util method to write a single Message object to the end of the database.json file
 */
export async function writeToJSONDatabase(message: Message): Promise<void> {
  const dbArray = await readFromJSONDatabase();
  dbArray.push(message);
  return fsPromises.writeFile(join(__dirname, 'database.json'), JSON.stringify(dbArray), { encoding: 'utf-8' });
}
