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
 * @param serviceKey the service key to get actions for, is case insensitive
 * @returns the actions for the service
 */
export function iamActionsForService(serviceKey: string): string[] {
  const data = readActionData<Record<string, Action>>(serviceKey.toLowerCase())
  return Object.values(data).map(action => action.name)
}

/**
 * Check if an action exists
 *
 * @param serviceKey the service key to check for the action, is case insensitive
 * @param actionKey the action key to check for, is case insensitive
 * @returns true if the action exists, false otherwise
 */
export function iamActionExists(serviceKey: string, actionKey: string): boolean {
  const data = readActionData<Record<string, Action>>(serviceKey.toLowerCase())
  return !!data[actionKey.toLowerCase()]
}

/**
 * Get the details for an action
 *
 * @param serviceKey the service key to get the action for, is case insensitive
 * @param actionKey the action key to get the details for, is case insensitive
 * @throws error if the service or action does not exist
 * @returns the details for the action
 */
export function iamActionDetails(serviceKey: string, actionKey: string): Action {
  const data = readActionData<Record<string, Action>>(serviceKey.toLowerCase())
  if(!data[actionKey.toLowerCase()]) {
    throw new Error(`Action ${actionKey} does not exist for service ${serviceKey}`)
  }
  return data[actionKey.toLowerCase()]
}