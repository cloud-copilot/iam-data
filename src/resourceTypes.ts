import { readResourceTypes } from "./data.js";

export interface ResourceType {
  readonly key: string;
  readonly name: string;
  readonly description: string;
}

/**
 *
 * @param serviceKey the service key to get the resource types for
 * @returns the resource types for the service
 */
export function iamResourceTypesForService(serviceKey: string): string[] {
  const data = readResourceTypes<Record<string, ResourceType>>(serviceKey);
  return Object.keys(data)
}

/**
 * Check if a resource type exists for a service and resource type key
 *
 * @param serviceKey the service key to check for the resource type
 * @param resourceTypeKey the resource type key to check for
 * @returns true if the resource type exists, false otherwise
 */
export function iamResourceTypeExists(serviceKey: string, resourceTypeKey: string): boolean {
  const data = readResourceTypes<Record<string, ResourceType>>(serviceKey);
  return !!data[resourceTypeKey];
}

/**
 * Get the resource type for a service and resource type key
 *
 * @param serviceKey the service key to get the resource type for
 * @param resourceTypeKey the resource type key to get the resource type for
 * @throws an error if the resource type does not exist
 * @returns the resource type
 */
export function iamResourceTypeDetails(serviceKey: string, resourceTypeKey: string): ResourceType {
  const data = readResourceTypes<Record<string, ResourceType>>(serviceKey);
  if(!data[resourceTypeKey]) {
    throw new Error(`Resource type ${resourceTypeKey} does not exist for service ${serviceKey}`);
  }
  return data[resourceTypeKey];
}