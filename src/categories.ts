import { readCategoryDetails, readDataFile } from './data.js'
import { iamServiceExists } from './services.js'

/**
 * Details for an AWS service category and the IAM services assigned to it.
 */
export interface CategoryDetails {
  /** Stable lowercase category key. */
  readonly key: string
  /** Properly capitalized category name from AWS. */
  readonly name: string
  /** Sorted IAM service keys assigned to the category. */
  readonly services: string[]
}

/**
 * Get all service category keys.
 *
 * @returns an array of all service category keys
 */
export async function serviceCategories(): Promise<string[]> {
  return readDataFile<string[]>('categories.json')
}

/**
 * Check if a service category exists.
 *
 * @param category the category key to check, is case insensitive
 * @returns true if the category exists, false otherwise
 */
export async function serviceCategoryExists(category: string): Promise<boolean> {
  const categoryNames = await readDataFile<Record<string, string>>('categoryNames.json')
  return !!categoryNames[category.toLowerCase()]
}

/**
 * Get the IAM service to category mapping.
 *
 * @returns a map of IAM service keys to category keys
 */
export async function iamServiceCategoryMap(): Promise<Record<string, string>> {
  return readDataFile<Record<string, string>>('serviceCategories.json')
}

/**
 * Get IAM service keys assigned to a service category.
 *
 * @param category the category key to get IAM services for, is case insensitive
 * @throws an error if the category does not exist
 * @returns sorted IAM service keys assigned to the category
 */
export async function iamServicesForCategory(category: string): Promise<string[]> {
  const categoryDetails = await getServiceCategory(category)
  return categoryDetails.services
}

/**
 * Get the service category key for an IAM service.
 *
 * @param service the IAM service key to get the category for, is case insensitive
 * @throws an error if the service does not exist or has no category mapping
 * @returns the category key for the IAM service
 */
export async function categoryForIamService(service: string): Promise<string> {
  const serviceKey = service.toLowerCase()
  const serviceExists = await iamServiceExists(serviceKey)
  if (!serviceExists) {
    throw new Error(`Service ${service} does not exist`)
  }

  const serviceCategories = await iamServiceCategoryMap()
  const category = serviceCategories[serviceKey]
  if (!category) {
    throw new Error(`Category for service ${service} does not exist`)
  }
  return category
}

/**
 * Get details for a service category.
 *
 * @param category the category key to get details for, is case insensitive
 * @throws an error if the category does not exist
 * @returns details for the service category
 */
export async function getServiceCategory(category: string): Promise<CategoryDetails> {
  const categoryKey = category.toLowerCase()
  const exists = await serviceCategoryExists(categoryKey)
  if (!exists) {
    throw new Error(`Category ${category} does not exist`)
  }
  return readCategoryDetails<CategoryDetails>(categoryKey)
}
