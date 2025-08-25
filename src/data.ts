import { readRelativeFile } from './readRelativeFile.js'

const dataCache: Record<string, any> = {}
const requestCache: Record<string, Promise<any>> = {}

export async function readDataFile<T>(...pathParts: string[]): Promise<T> {
  pathParts.unshift('data')
  const file = pathParts.join('/')

  // If the data is already cached, return it immediately.
  if (dataCache[file]) {
    return dataCache[file]
  }

  // If there's an ongoing request, return the existing Promise.
  if (requestCache[file] !== undefined) {
    return requestCache[file]
  }

  // Create a new Promise and store it in dataQueues synchronously.
  requestCache[file] = (async () => {
    try {
      const data = await readRelativeFile(pathParts)
      dataCache[file] = data // Cache the fetched data.
      return data
    } finally {
      delete requestCache[file] // Clean up the queue regardless of success or failure.
    }
  })()

  return requestCache[file]
}

/**
 * Read the action data for a service
 *
 * @param serviceKey the service key to read the action data for
 * @returns the action data for the service
 */
export async function readActionData<T>(serviceKey: string): Promise<T> {
  return readDataFile<T>('actions', `${serviceKey}.json`)
}

/**
 * Read the condition key data for a service
 *
 * @param serviceKey the service key to read the condition key data for
 * @returns the condition key data
 */
export async function readConditionKeys<T>(serviceKey: string): Promise<T> {
  return readDataFile<T>('conditionKeys', `${serviceKey}.json`)
}

/**
 * Read the resource type data for a service
 *
 * @param serviceKey the service key to read the resource type data for
 * @returns the resource type data
 */
export async function readResourceTypes<T>(serviceKey: string): Promise<T> {
  return readDataFile<T>('resourceTypes', `${serviceKey}.json`)
}

/**
 * Read the condition patterns data
 *
 * @returns the condition patterns data
 */
export async function readConditionPatterns(): Promise<Record<string, Record<string, string>>> {
  return readDataFile<Record<string, Record<string, string>>>('conditionPatterns.json')
}

/**
 * Read the unassociated conditions data
 *
 * @returns the unassociated conditions data
 */
export async function readUnassociatedConditions(): Promise<Record<string, string[]>> {
  return readDataFile<Record<string, string[]>>('unassociatedConditions.json')
}
