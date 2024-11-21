import { describe, expect, it } from 'vitest'
import { iamConditionKeyDetails, iamConditionKeyExists, iamConditionKeysForService } from "./conditionKeys"

describe("conditionKeys", () => {
  describe("iamConditionKeysForService", () => {
    it("returns an array of strings", async() => {
      // Given a service that exists
      const serviceKey = "s3"

      // When iamConditionKeysForService is called
      const result = await iamConditionKeysForService(serviceKey)

      // Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('iamConditionKeyExists', () => {
    it('returns true if the condition key exists', async () => {
      // Given a service and condition key that exists
      const serviceKey = 's3'
      const conditionKey = 'aws:RequestTag/${TagKey}'

      // When iamConditionKeyExists is called
      const result = await iamConditionKeyExists(serviceKey, conditionKey)

      // Then result should be true
      expect(result).toBe(true)
    })

    it('returns false if the condition key does not exist', async () => {
      // Given a service that exists but a condition key that does not
      const serviceKey = 's3'
      const conditionKey = 'FakeConditionKey'

      // When iamConditionKeyExists is called
      const result = await iamConditionKeyExists(serviceKey, conditionKey)

      // Then result should be false
      expect(result).toBe(false)
    })
  })

  describe('iamConditionKeyDetails', () => {
    it('returns an object with the correct keys', async () => {
      // Given a service and condition key that exists
      const serviceKey = 's3'
      const conditionKey = 'aws:RequestTag/${TagKey}'

      // When iamConditionKeyDetails is called
      const result = await iamConditionKeyDetails(serviceKey, conditionKey)

      // Then result should be an object with the correct keys
      expect(result).toHaveProperty('key')
    })
    it('throws an error if the condition key does not exist', async () => {
      // Given a service that exists but a condition key that does not
      const serviceKey = 's3'
      const conditionKey = 'FakeConditionKey'

      // When iamConditionKeyDetails is called
      // Then an error should be thrown
      await expect(
         iamConditionKeyDetails(serviceKey, conditionKey)
      ).rejects.toThrow('Condition key FakeConditionKey does not exist for service s3')
    })
  })
})