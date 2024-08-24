import { readFileSync } from "fs";
import { join } from "path";

let dataRoot = join(__dirname, '..', '..', 'data');
if(__dirname.endsWith('src')) {
  dataRoot = join(__dirname, '..', 'data');
}

/**
 * Get the root path to the data directory
 *
 * @returns the root path to the data directory
 */
// function dataRoot(): string {
//   console.log(__dirname);
//   return join(__dirname, '..', 'data');
// }

const dataCache: Record<string, any> = {};

/**
 * Get a data file from the data directory
 *
 * @param file the path to the file to retrieve data for.
 * @returns the data from the file
 */
export function readDataFile<T>(file: string): T {
  if(!dataCache[file]) {
    const data = readFileSync(join(dataRoot, file), 'utf8');
    dataCache[file] = JSON.parse(data);
  }
  return dataCache[file];
}

/**
 * Read the action data for a service
 *
 * @param serviceKey the service key to read the action data for
 * @returns the action data for the service
 */
export function readActionData<T>(serviceKey: string): T {
  return readDataFile<T>(join('actions', `${serviceKey}.json`));
}

/**
 * Read the condition key data for a service
 *
 * @param serviceKey the service key to read the condition key data for
 * @returns the condition key data
 */
export function readConditionKeys<T>(serviceKey: string): T {
  return readDataFile<T>(join('conditionKeys', `${serviceKey}.json`));
}

/**
 * Read the resource type data for a service
 *
 * @param serviceKey the service key to read the resource type data for
 * @returns the resource type data
 */
export function readResourceTypes<T>(serviceKey: string): T {
  return readDataFile<T>(join('resourceTypes', `${serviceKey}.json`));
}