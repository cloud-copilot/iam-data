import { describe, expect, it } from 'vitest'
import { iamResourceTypeDetails, iamResourceTypeExists, iamResourceTypesForService } from "./resourceTypes"

describe("resourceTypes", () => {
  describe("iamResourceTypesForService", () => {
    it("should return an array of strings", () => {
      //Given iamResourceTypesForService exists
      const serviceKey = "s3"

      //When iamResourceTypesForService is called
      const result = iamResourceTypesForService(serviceKey)

      //Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe("iamResourceTypeExists", () => {
    it("should return true if the resource type exists", () => {
      //Given a resource type that exists
      const serviceKey = "s3"
      const resourceTypeKey = "bucket"

      //When iamResourceTypeExists is called
      const result = iamResourceTypeExists(serviceKey, resourceTypeKey)

      //Then result should be true
      expect(result).toBe(true)
    })

    it("should return false if the resource type does not exist", () => {
      //Given a resource type that does not exist
      const serviceKey = "s3"
      const resourceTypeKey = "FakeResourceType"

      //When iamResourceTypeExists is called
      const result = iamResourceTypeExists(serviceKey, resourceTypeKey)

      //Then result should be false
      expect(result).toBe(false)
    })
  })

  describe("iamResourceTypeDetails", () => {
    it("should return the details of the resource type", () => {
      //Given a resource type that exists
      const serviceKey = "s3"
      const resourceTypeKey = "bucket"

      //When iamResourceTypeDetails is called
      const result = iamResourceTypeDetails(serviceKey, resourceTypeKey)

      //Then result should be the details of the resource type
      expect(result).toHaveProperty("key", "bucket")
    })

    it("should throw an error if the resource type does not exist", () => {
      //Given a resource type that does not exist
      const serviceKey = "s3"
      const resourceTypeKey = "FakeResourceType"

      //When iamResourceTypeDetails is called
      //Then an error should be thrown
      expect(() => iamResourceTypeDetails(serviceKey, resourceTypeKey)).toThrow("Resource type FakeResourceType does not exist for service s3")
    })
  })
})