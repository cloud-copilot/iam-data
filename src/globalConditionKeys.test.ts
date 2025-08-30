import { describe, expect, it } from 'vitest'
import {
  getAllGlobalConditionKeys,
  getGlobalConditionKeyByName,
  getGlobalConditionKeyByPrefix,
  GlobalConditionKey,
  globalConditionKeys
} from './globalConditionKeys'

describe('globalConditionKeys', () => {
  describe('globalConditionKeys array', () => {
    it('contains AWS global condition keys with required properties', () => {
      // Given the globalConditionKeys array
      const keys = globalConditionKeys

      // When checking the array structure
      const firstKey = keys[0]

      // Then the array should not be empty and have proper structure
      expect(keys.length).toBeGreaterThan(0)
      expect(firstKey).toHaveProperty('key')
      expect(firstKey).toHaveProperty('category')
      expect(firstKey).toHaveProperty('type')
      expect(firstKey).toHaveProperty('description')
    })

    it('contains the aws:PrincipalArn condition key', () => {
      // Given the globalConditionKeys array
      const keys = globalConditionKeys

      // When searching for aws:PrincipalArn
      const principalArnKey = keys.find((key) => key.key === 'aws:PrincipalArn')

      // Then it should exist with correct properties
      expect(principalArnKey).toBeDefined()
      expect(principalArnKey?.category).toBe('principal')
      expect(principalArnKey?.type).toBe('ARN')
    })

    it('contains the aws:PrincipalAccount condition key', () => {
      // Given the globalConditionKeys array
      const keys = globalConditionKeys

      // When searching for aws:PrincipalAccount
      const principalAccountKey = keys.find((key) => key.key === 'aws:PrincipalAccount')

      // Then it should exist with correct properties
      expect(principalAccountKey).toBeDefined()
      expect(principalAccountKey?.category).toBe('principal')
      expect(principalAccountKey?.type).toBe('String')
    })

    it('contains tag-based condition keys with variable patterns', () => {
      // Given the globalConditionKeys array
      const keys = globalConditionKeys

      // When searching for tag-based keys
      const tagKeys = keys.filter((key) => key.key.includes('/tag-key'))

      // Then it should contain common tag patterns
      expect(tagKeys.length).toBeGreaterThan(0)
      const principalTagKey = tagKeys.find((key) => key.key === 'aws:PrincipalTag/tag-key')
      expect(principalTagKey).toBeDefined()
      expect(principalTagKey?.category).toBe('principal')
    })

    it('contains the new VPC endpoint condition keys', () => {
      // Given the globalConditionKeys array
      const keys = globalConditionKeys

      // When searching for VPC endpoint keys
      const vpceAccountKey = keys.find((key) => key.key === 'aws:VpceAccount')
      const vpceOrgPathsKey = keys.find((key) => key.key === 'aws:VpceOrgPaths')
      const vpceOrgIDKey = keys.find((key) => key.key === 'aws:VpceOrgID')

      // Then all VPC endpoint keys should exist with correct properties
      expect(vpceAccountKey).toBeDefined()
      expect(vpceAccountKey?.category).toBe('network')
      expect(vpceAccountKey?.type).toBe('String')

      expect(vpceOrgPathsKey).toBeDefined()
      expect(vpceOrgPathsKey?.category).toBe('network')
      expect(vpceOrgPathsKey?.type).toBe('ArrayOfString')

      expect(vpceOrgIDKey).toBeDefined()
      expect(vpceOrgIDKey?.category).toBe('network')
      expect(vpceOrgIDKey?.type).toBe('String')
    })

    it('contains keys from different categories', () => {
      // Given the globalConditionKeys array
      const keys = globalConditionKeys

      // When grouping by category
      const categories = new Set(keys.map((key) => key.category))

      // Then it should contain multiple categories
      expect(categories.size).toBeGreaterThan(1)
      expect(categories.has('principal')).toBe(true)
      expect(categories.has('session')).toBe(true)
      expect(categories.has('request')).toBe(true)
      expect(categories.has('network')).toBe(true)
    })
  })

  describe('getGlobalConditionKeyByName', () => {
    it('returns condition key for exact match', () => {
      // Given a valid condition key name
      const keyName = 'aws:PrincipalArn'

      // When getGlobalConditionKeyByName is called
      const result = getGlobalConditionKeyByName(keyName)

      // Then it should return the correct condition key
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:PrincipalArn')
      expect(result?.type).toBe('ARN')
      expect(result?.category).toBe('principal')
    })

    it('returns condition key for case-insensitive match', () => {
      // Given a condition key name with different case
      const keyName = 'AWS:PRINCIPALARN'

      // When getGlobalConditionKeyByName is called
      const result = getGlobalConditionKeyByName(keyName)

      // Then it should return the correct condition key
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:PrincipalArn')
      expect(result?.type).toBe('ARN')
    })

    it('returns undefined for non-existent condition key', () => {
      // Given a non-existent condition key name
      const keyName = 'aws:NonExistentKey'

      // When getGlobalConditionKeyByName is called
      const result = getGlobalConditionKeyByName(keyName)

      // Then it should return undefined
      expect(result).toBeUndefined()
    })

    it('returns condition key for new VPC endpoint keys', () => {
      // Given new VPC endpoint condition key names
      const vpceAccountKey = 'aws:VpceAccount'
      const vpceOrgPathsKey = 'aws:VpceOrgPaths'
      const vpceOrgIDKey = 'aws:VpceOrgID'

      // When getGlobalConditionKeyByName is called for each
      const accountResult = getGlobalConditionKeyByName(vpceAccountKey)
      const orgPathsResult = getGlobalConditionKeyByName(vpceOrgPathsKey)
      const orgIDResult = getGlobalConditionKeyByName(vpceOrgIDKey)

      // Then all should return the correct condition keys
      expect(accountResult).toBeDefined()
      expect(accountResult?.key).toBe('aws:VpceAccount')
      expect(accountResult?.category).toBe('network')

      expect(orgPathsResult).toBeDefined()
      expect(orgPathsResult?.key).toBe('aws:VpceOrgPaths')
      expect(orgPathsResult?.category).toBe('network')

      expect(orgIDResult).toBeDefined()
      expect(orgIDResult?.key).toBe('aws:VpceOrgID')
      expect(orgIDResult?.category).toBe('network')
    })

    it('handles empty string input', () => {
      // Given an empty string
      const keyName = ''

      // When getGlobalConditionKeyByName is called
      const result = getGlobalConditionKeyByName(keyName)

      // Then it should return undefined
      expect(result).toBeUndefined()
    })
  })

  describe('getGlobalConditionKeyByPrefix', () => {
    it('returns condition key for tag variable prefix', () => {
      // Given a tag variable prefix
      const prefix = 'aws:PrincipalTag'

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return an array with the template condition key
      expect(result?.key).toBe('aws:PrincipalTag/tag-key')
      expect(result?.category).toBe('principal')
    })

    it('returns condition key for ResourceTag prefix', () => {
      // Given a ResourceTag prefix
      const prefix = 'aws:ResourceTag'

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return an array with the template condition key
      expect(result?.key).toBe('aws:ResourceTag/tag-key')
      expect(result?.category).toBe('resource')
    })

    it('returns condition key for RequestedRegion prefix', () => {
      // Given a RequestedRegion prefix
      const prefix = 'aws:RequestedRegion'

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return an empty array (no variable pattern)
      expect(result).toBeUndefined()
    })

    it('returns empty array for non-variable condition key prefix', () => {
      // Given a prefix that doesn't have variable pattern
      const prefix = 'aws:PrincipalArn'

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return an empty array
      expect(result).toBeUndefined()
    })

    it('returns empty array for non-existent prefix', () => {
      // Given a non-existent prefix
      const prefix = 'aws:NonExistentPrefix'

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return an empty array
      expect(result).toBeUndefined()
    })

    it('handles case-insensitive prefix matching', () => {
      // Given a prefix with different case
      const prefix = 'AWS:PRINCIPALTAG'

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return the correct condition key
      expect(result?.key).toBe('aws:PrincipalTag/tag-key')
    })

    it('handles empty string prefix', () => {
      // Given an empty string prefix
      const prefix = ''

      // When getGlobalConditionKeyByPrefix is called
      const result = getGlobalConditionKeyByPrefix(prefix)

      // Then it should return an empty array
      expect(result).toBeUndefined()
    })
  })

  describe('getAllGlobalConditionKeys', () => {
    it('returns array of all condition key names', () => {
      // Given the getAllGlobalConditionKeys function
      // When calling the function
      const result = getAllGlobalConditionKeys()

      // Then it should return an array of strings
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(typeof result[0]).toBe('string')
    })

    it('includes aws:PrincipalArn in the result', () => {
      // Given the getAllGlobalConditionKeys function
      // When calling the function
      const result = getAllGlobalConditionKeys()

      // Then it should include aws:PrincipalArn
      expect(result).toContain('aws:PrincipalArn')
    })

    it('includes the new VPC endpoint condition keys', () => {
      // Given the getAllGlobalConditionKeys function
      // When calling the function
      const result = getAllGlobalConditionKeys()

      // Then it should include all new VPC endpoint keys
      expect(result).toContain('aws:VpceAccount')
      expect(result).toContain('aws:VpceOrgPaths')
      expect(result).toContain('aws:VpceOrgID')
    })

    it('includes tag-based condition keys', () => {
      // Given the getAllGlobalConditionKeys function
      // When calling the function
      const result = getAllGlobalConditionKeys()

      // Then it should include tag-based keys
      expect(result).toContain('aws:PrincipalTag/tag-key')
      expect(result).toContain('aws:ResourceTag/tag-key')
      expect(result).toContain('aws:RequestTag/tag-key')
    })

    it('returns same number of keys as globalConditionKeys array', () => {
      // Given the getAllGlobalConditionKeys function and globalConditionKeys array
      // When calling the function
      const result = getAllGlobalConditionKeys()

      // Then the length should match the globalConditionKeys array
      expect(result.length).toBe(globalConditionKeys.length)
    })

    it('contains no duplicate entries', () => {
      // Given the getAllGlobalConditionKeys function
      // When calling the function
      const result = getAllGlobalConditionKeys()

      // Then there should be no duplicates
      const uniqueKeys = new Set(result)
      expect(uniqueKeys.size).toBe(result.length)
    })
  })

  describe('GlobalConditionKey interface', () => {
    it('extends ConditionKey with category property', () => {
      // Given a GlobalConditionKey from the array
      const key: GlobalConditionKey = globalConditionKeys[0]

      // When checking its properties
      // Then it should have all required properties
      expect(key).toHaveProperty('key')
      expect(key).toHaveProperty('type')
      expect(key).toHaveProperty('description')
      expect(key).toHaveProperty('category')
      expect(typeof key.key).toBe('string')
      expect(typeof key.type).toBe('string')
      expect(typeof key.description).toBe('string')
      expect(typeof key.category).toBe('string')
    })

    it('has valid type values', () => {
      // Given all global condition keys
      const keys = globalConditionKeys

      // When checking type values
      const types = new Set(keys.map((key) => key.type))

      // Then all types should be valid
      const validTypes = ['String', 'ARN', 'Bool', 'Numeric', 'Date', 'ArrayOfString', 'IPAddress']
      types.forEach((type) => {
        expect(validTypes).toContain(type)
      })
    })

    it('has valid category values', () => {
      // Given all global condition keys
      const keys = globalConditionKeys

      // When checking category values
      const categories = new Set(keys.map((key) => key.category))

      // Then all categories should be meaningful
      expect(categories.size).toBeGreaterThan(0)
      categories.forEach((category) => {
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })
  })
})
