import { conditionKeyExists, getConditionKeyDetails, getConditionKeysForService } from "./conditionKeys"

describe("conditionKeys", () => {
  describe("getConditionKeysForService", () => {
    it("returns an array of strings", () => {
      // Given a service that exists
      // When getConditionKeysForService is called
      const result = getConditionKeysForService("s3")
      // Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('conditionKeyExists', () => {
    it('returns true if the condition key exists', () => {
      // Given a service and condition key that exists
      // When conditionKeyExists is called
      const result = conditionKeyExists('s3', 'aws:RequestTag/${TagKey}')
      // Then result should be true
      expect(result).toBe(true)
    })
    it('returns false if the condition key does not exist', () => {
      // Given a service that exists but a condition key that does not
      // When conditionKeyExists is called
      const result = conditionKeyExists('s3', 'FakeConditionKey')
      // Then result should be false
      expect(result).toBe(false)
    })
  })

  describe('getConditionKeyDetails', () => {
    it('returns an object with the correct keys', () => {
      // Given a service and condition key that exists
      // When getConditionKeyDetails is called
      const result = getConditionKeyDetails('s3', 'aws:RequestTag/${TagKey}')
      // Then result should be an object with the correct keys
      expect(result).toHaveProperty('key')
    })
    it('throws an error if the condition key does not exist', () => {
      // Given a service that exists but a condition key that does not
      // When getConditionKeyDetails is called
      // Then an error should be thrown
      expect(() => getConditionKeyDetails('s3', 'FakeConditionKey')).toThrow('Condition key FakeConditionKey does not exist for service s3')
    })
  })
})