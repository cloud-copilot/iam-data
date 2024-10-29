import { readResourceTypes } from "./data.js";

export interface ResourceType {
  readonly key: string;
  readonly arn: string;
  readonly conditionKeys: string[];
}

/**
 *
 * @param serviceKey the service key to get the resource types for, is case insensitive
 * @returns the resource types for the service
 */
export async function iamResourceTypesForService(serviceKey: string): Promise<string[]> {
  const data = await readResourceTypes<Record<string, ResourceType>>(serviceKey.toLowerCase());
  return Object.values(data).map(resourceType => resourceType.key);
}

/**
 * Check if a resource type exists for a service and resource type key
 *
 * @param serviceKey the service key to check for the resource type, is case insensitive
 * @param resourceTypeKey the resource type key to check for, is case insensitive
 * @returns true if the resource type exists, false otherwise
 */
export async function iamResourceTypeExists(serviceKey: string, resourceTypeKey: string): Promise<boolean> {
  const data = await readResourceTypes<Record<string, ResourceType>>(serviceKey.toLowerCase());
  return !!data[resourceTypeKey.toLowerCase()];
}

/**
 * Get the resource type for a service and resource type key
 *
 * @param serviceKey the service key to get the resource type for, is case insensitive
 * @param resourceTypeKey the resource type key to get the resource type for, is case insensitive
 * @throws an error if the resource type does not exist
 * @returns the resource type
 */
export async function iamResourceTypeDetails(serviceKey: string, resourceTypeKey: string): Promise<ResourceType> {
  const data = await readResourceTypes<Record<string, ResourceType>>(serviceKey.toLowerCase());
  if(!data[resourceTypeKey.toLowerCase()]) {
    throw new Error(`Resource type ${resourceTypeKey} does not exist for service ${serviceKey}`);
  }
  return data[resourceTypeKey.toLowerCase()];
}