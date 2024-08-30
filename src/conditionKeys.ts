import { readConditionKeys } from "./data.js"

export interface ConditionKey {
  key: string,
  description: string,
  type: string
}

/**
 * Reads the condition keys for a service
 *
 * @param serviceKey the service key to read the condition keys for
 * @returns the condition keys for the service
 */
export function getConditionKeysForService(serviceKey: string): string[] {
  const data = readConditionKeys<Record<string, ConditionKey>>(serviceKey)
  return Object.keys(data)
}

/**
 * Check if a condition key exists
 *
 * @param serviceKey the service key to check for the condition key
 * @param conditionKey the condition key to check for
 * @returns true if the condition key exists, false otherwise
 */
export function conditionKeyExists(serviceKey: string, conditionKey: string): boolean {
  const data = readConditionKeys<Record<string, ConditionKey>>(serviceKey)
  return !!data[conditionKey]
}

/**
 * Get the details for a condition key
 *
 * @param serviceKey the service key to get the condition key for
 * @param conditionKey the condition key to get the details for
 * @throws error if the service or condition key does not exist
 * @returns the details for the condition key
 */
export function getConditionKeyDetails(serviceKey: string, conditionKey: string): ConditionKey {
  const data = readConditionKeys<Record<string, ConditionKey>>(serviceKey)
  if(!data[conditionKey]) {
    throw new Error(`Condition key ${conditionKey} does not exist for service ${serviceKey}`)
  }
  return data[conditionKey]
}