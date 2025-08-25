import { readConditionKeys } from './data.js'

export interface ConditionKey {
  key: string
  description: string
  type: string
}

/**
 * Reads the condition keys for a service
 *
 * @param serviceKey the service key to read the condition keys for, is case insensitive
 * @returns the condition keys for the service
 */
export async function iamConditionKeysForService(serviceKey: string): Promise<string[]> {
  const data = await readConditionKeys<Record<string, ConditionKey>>(serviceKey.toLowerCase())
  return Object.values(data).map((conditionKey) => conditionKey.key)
}

/**
 * Check if a condition key exists
 *
 * @param serviceKey the service key to check for the condition key, is case insensitive
 * @param conditionKey the condition key to check for, is case insensitive
 * @returns true if the condition key exists, false otherwise
 */
export async function iamConditionKeyExists(
  serviceKey: string,
  conditionKey: string
): Promise<boolean> {
  const data = await readConditionKeys<Record<string, ConditionKey>>(serviceKey.toLowerCase())
  return !!data[conditionKey.toLowerCase()]
}

/**
 * Get the details for a condition key
 *
 * @param serviceKey the service key to get the condition key for, is case insensitive
 * @param conditionKey the condition key to get the details for, is case insensitive
 * @throws error if the service or condition key does not exist
 * @returns the details for the condition key
 */
export async function iamConditionKeyDetails(
  serviceKey: string,
  conditionKey: string
): Promise<ConditionKey> {
  const data = await readConditionKeys<Record<string, ConditionKey>>(serviceKey.toLowerCase())
  if (!data[conditionKey.toLowerCase()]) {
    throw new Error(`Condition key ${conditionKey} does not exist for service ${serviceKey}`)
  }
  return data[conditionKey.toLowerCase()]
}

export async function getConditionKeysWithVariables(serviceKey: string): Promise<string[]> {
  const data = await readConditionKeys<Record<string, ConditionKey>>(serviceKey.toLowerCase())
  return Object.values(data)
    .filter((conditionKey) => conditionKey.key.includes('${'))
    .map((conditionKey) => conditionKey.key)
}
