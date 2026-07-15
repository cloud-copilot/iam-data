import { describe, expect, it } from 'vitest'
import {
  categoryForIamService,
  getServiceCategory,
  iamServiceCategoryMap,
  iamServicesForCategory,
  serviceCategories,
  serviceCategoryExists
} from './categories'

describe('categories', () => {
  describe('serviceCategories', () => {
    it('should return sorted service category keys', async () => {
      //Given service category data exists
      //When serviceCategories is called
      const result = await serviceCategories()

      //Then known categories are returned in sorted order
      expect(result).toContain('analytics')
      expect(result).toContain('compute')
      expect(result).toEqual([...result].sort())
    })
  })

  describe('serviceCategoryExists', () => {
    it('should return true for an existing category case-insensitively', async () => {
      //Given a category that exists with different casing
      const category = 'Storage'

      //When serviceCategoryExists is called
      const result = await serviceCategoryExists(category)

      //Then the category is found
      expect(result).toBe(true)
    })

    it('should return false for a category that does not exist', async () => {
      //Given a category that does not exist
      const category = 'fake-category'

      //When serviceCategoryExists is called
      const result = await serviceCategoryExists(category)

      //Then the category is not found
      expect(result).toBe(false)
    })
  })

  describe('iamServiceCategoryMap', () => {
    it('should return the IAM service to category mapping', async () => {
      //Given service category map data exists
      //When iamServiceCategoryMap is called
      const result = await iamServiceCategoryMap()

      //Then known service category mappings are returned
      expect(result.s3).toBe('storage')
      expect(result.ec2).toBe('compute')
      expect(result.iam).toBe('security-identity-and-compliance')
    })
  })

  describe('iamServicesForCategory', () => {
    it('should return sorted IAM services for a category', async () => {
      //Given a category with IAM services
      const category = 'storage'

      //When iamServicesForCategory is called
      const result = await iamServicesForCategory(category)

      //Then services are returned in sorted order with expected members
      expect(result).toContain('s3')
      expect(result).toContain('s3-outposts')
      expect(result).toEqual([...result].sort())
    })

    it('should throw an error if the category does not exist', async () => {
      //Given a category that does not exist
      const category = 'fake-category'

      //When iamServicesForCategory is called
      //Then an error should be thrown
      await expect(iamServicesForCategory(category)).rejects.toThrow(
        'Category fake-category does not exist'
      )
    })
  })

  describe('categoryForIamService', () => {
    it('should return the category for an IAM service case-insensitively', async () => {
      //Given a service that exists with different casing
      const service = 'S3'

      //When categoryForIamService is called
      const result = await categoryForIamService(service)

      //Then the service category key is returned
      expect(result).toBe('storage')
    })

    it('should throw an error if the service does not exist', async () => {
      //Given a service that does not exist
      const service = 'fake-service'

      //When categoryForIamService is called
      //Then an error should be thrown
      await expect(categoryForIamService(service)).rejects.toThrow(
        'Service fake-service does not exist'
      )
    })
  })

  describe('getServiceCategory', () => {
    it('should return category details with proper capitalization and services', async () => {
      //Given a category that exists
      const category = 'security-identity-and-compliance'

      //When getServiceCategory is called
      const result = await getServiceCategory(category)

      //Then category details are returned
      expect(result).toEqual(
        expect.objectContaining({
          key: 'security-identity-and-compliance',
          name: 'Security, identity, and compliance'
        })
      )
      expect(result.services).toContain('iam')
      expect(result.services).toContain('sts')
    })

    it('should throw an error if the category does not exist', async () => {
      //Given a category that does not exist
      const category = 'fake-category'

      //When getServiceCategory is called
      //Then an error should be thrown
      await expect(getServiceCategory(category)).rejects.toThrow(
        'Category fake-category does not exist'
      )
    })
  })
})
