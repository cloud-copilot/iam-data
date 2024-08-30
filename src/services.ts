import { readDataFile } from './data.js';

/**
 * Get keys for all services
 *
 * @returns an array of all service keys
 */
export function allServiceKeys(): string[] {
  return readDataFile<string[]>('services.json')
}

/**
 * Check if a service exists
 *
 * @param serviceKey the service key to check
 * @returns true if the service exists, false otherwise
 */
export function serviceExists(serviceKey: string): boolean {
  const data = readDataFile<Record<string, string>>('serviceNames.json')
  return !!data[serviceKey];
}

/**
 * Get the name of a service
 *
 * @param serviceKey the service key to get the name for
 * @throws error if the service does not exist
 * @returns the name of the service
 */
export function getServiceName(serviceKey: string): string {
  const data = readDataFile<Record<string, string>>('serviceNames.json')
  if(!data[serviceKey]) {
    throw new Error(`Service ${serviceKey} does not exist`)
  }
  return data[serviceKey]
}