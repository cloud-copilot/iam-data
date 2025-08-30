import { ConditionKey, iamConditionKeyDetails, iamConditionKeyExists } from './conditionKeys.js'
import { readConditionPatterns, readUnassociatedConditions } from './data.js'
import {
  getGlobalConditionKeyByName,
  getGlobalConditionKeyByPrefix
} from './globalConditionKeys.js'
import { iamServiceExists } from './services.js'

/**
 * Get the service prefixes to search for a condition key
 *
 * @param servicePrefix the original service prefix from the condition key
 * @returns an array of service prefixes to search
 */
async function getServicePrefixes(servicePrefix: string): Promise<string[]> {
  // Check if the service exists
  const serviceExists = await iamServiceExists(servicePrefix)

  if (serviceExists) {
    return [servicePrefix]
  }

  // Service doesn't exist, check unassociated conditions
  const unassociatedConditions = await readUnassociatedConditions()
  return unassociatedConditions[servicePrefix] || []
}

/**
 * Find the details for a condition key if it exists. This will check both global condition
 * keys and service specific condition keys. If @param conditionKey matches a condition key that
 * contains a variable it will return the matching condition key.
 *
 * If no match can be found, it will return undefined.
 *
 * @param conditionKey the condition key to find, is case insensitive
 */
export async function findConditionKey(conditionKey: string): Promise<ConditionKey | undefined> {
  const normalizedConditionKey = conditionKey.toLowerCase()

  // If it starts with 'aws', check global condition keys
  if (normalizedConditionKey.startsWith('aws:')) {
    // First check for exact match in global condition keys
    const exactGlobalMatch = getGlobalConditionKeyByName(normalizedConditionKey)
    if (exactGlobalMatch) {
      return exactGlobalMatch
    }

    // Then check global condition keys with variables (like aws:PrincipalTag/tag-key)
    const slashIndex = normalizedConditionKey.indexOf('/')
    if (slashIndex !== -1) {
      const prefix = normalizedConditionKey.substring(0, slashIndex)
      const variableGlobalMatch = getGlobalConditionKeyByPrefix(prefix)
      if (variableGlobalMatch && conditionKey.length > prefix.length + 1) {
        return variableGlobalMatch
      }
    }

    return undefined
  }

  // If it doesn't start with 'aws', extract the service prefix
  const colonIndex = normalizedConditionKey.indexOf(':')
  if (colonIndex === -1) {
    return undefined // No service prefix found
  }

  const servicePrefix = normalizedConditionKey.substring(0, colonIndex)

  // Get all service prefixes to search
  const servicesToSearch = await getServicePrefixes(servicePrefix)

  if (servicesToSearch.length === 0) {
    return undefined // No services found for this condition prefix
  }

  // Check each service for the condition key
  for (const service of servicesToSearch) {
    // Check for exact match in service condition keys
    const hasConditionKey = await iamConditionKeyExists(service, normalizedConditionKey)
    if (hasConditionKey) {
      return await iamConditionKeyDetails(service, normalizedConditionKey)
    }
  }

  // Last resort: check condition patterns
  const conditionPatterns = await readConditionPatterns()
  const servicePatterns = conditionPatterns[servicePrefix]

  if (servicePatterns) {
    for (const [patternStr, templateKey] of Object.entries(servicePatterns)) {
      const regex = new RegExp(`^${patternStr}$`, 'i')
      if (regex.test(normalizedConditionKey)) {
        // Found a pattern match, try to get the template condition key
        const hasTemplateKey = await iamConditionKeyExists(servicePrefix, templateKey)
        if (hasTemplateKey) {
          return await iamConditionKeyDetails(servicePrefix, templateKey)
        }
      }
    }
  }

  return undefined
}
