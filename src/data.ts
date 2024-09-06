import { join } from "path";
import { readRelativeFile } from "./readRelativeFile.js";

const dataCache: Record<string, any> = {};

export async function readDataFile<T>(...pathParts: string[]): Promise<T> {
  pathParts.unshift('data');
  const file = join(...pathParts);
  if(!dataCache[file]) {
    const data = await readRelativeFile(pathParts)
    dataCache[file] = data
  }
  return dataCache[file];
}

/**
 * Read the action data for a service
 *
 * @param serviceKey the service key to read the action data for
 * @returns the action data for the service
 */
export async function readActionData<T>(serviceKey: string): Promise<T> {
  return readDataFile<T>('actions', `${serviceKey}.json`);
}

/**
 * Read the condition key data for a service
 *
 * @param serviceKey the service key to read the condition key data for
 * @returns the condition key data
 */
export async function readConditionKeys<T>(serviceKey: string): Promise<T> {
  return readDataFile<T>('conditionKeys', `${serviceKey}.json`);
}

/**
 * Read the resource type data for a service
 *
 * @param serviceKey the service key to read the resource type data for
 * @returns the resource type data
 */
export async function readResourceTypes<T>(serviceKey: string): Promise<T> {
  return readDataFile<T>('resourceTypes', `${serviceKey}.json`);
}