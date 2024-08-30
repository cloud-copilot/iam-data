import { readActionData } from "./data.js"

interface ActionResourceType {
  "name": string,
  "required": boolean,
  "conditionKeys": string[],
  "dependentActions": string[]
}

interface Action {
  "name": string
  "description": string
  "accessLevel": "Read" | "Write" | "List" | "Tagging",
  "resourceTypes": ActionResourceType[],
  "conditionKeys": string[],
  "dependentActions": string[]
}

/**
 * Get all actions for a service
 *
 * @param serviceKey the service key to get actions for
 * @returns the actions for the service
 */
export function iamActionsForService(serviceKey: string): string[] {
  const data = readActionData<Record<string, Action>>(serviceKey)
  return Object.keys(data)
}

/**
 * Check if an action exists
 *
 * @param serviceKey the service key to check for the action
 * @param actionKey the action key to check for
 * @returns true if the action exists, false otherwise
 */
export function iamActionExists(serviceKey: string, actionKey: string): boolean {
  const data = readActionData<Record<string, Action>>(serviceKey)
  return !!data[actionKey]
}

/**
 * Get the details for an action
 *
 * @param serviceKey the service key to get the action for
 * @param actionKey the action key to get the details for
 * @throws error if the service or action does not exist
 * @returns the details for the action
 */
export function iamActionDetails(serviceKey: string, actionKey: string): Action {
  const data = readActionData<Record<string, Action>>(serviceKey)
  if(!data[actionKey]) {
    throw new Error(`Action ${actionKey} does not exist for service ${serviceKey}`)
  }
  return data[actionKey]
}