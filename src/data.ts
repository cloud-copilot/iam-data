import { join } from "path";
import { readRelativeFile } from "./readRelativeFile.js";

const dataCache: Record<string, any> = {};

export function readDataFile<T>(...pathParts: string[]): T {
  pathParts.unshift('data');
  const file = join(...pathParts);
  if(!dataCache[file]) {
    const data = readRelativeFile(pathParts)
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
  return readDataFile<T>('actions', `${serviceKey}.json`);
}

/**
 * Read the condition key data for a service
 *
 * @param serviceKey the service key to read the condition key data for
 * @returns the condition key data
 */
export function readConditionKeys<T>(serviceKey: string): T {
  return readDataFile<T>('conditionKeys', `${serviceKey}.json`);
}

/**
 * Read the resource type data for a service
 *
 * @param serviceKey the service key to read the resource type data for
 * @returns the resource type data
 */
export function readResourceTypes<T>(serviceKey: string): T {
  return readDataFile<T>('resourceTypes', `${serviceKey}.json`);
}