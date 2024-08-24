import { getResourceTypeDetails, resourceTypeExists, resourceTypesForService } from "./resourceTypes"

describe("resourceTypes", () => {
  describe("resourceTypesForService", () => {
    it("should return an array of strings", () => {
      //Given resourceTypesForService exists
      //When resourceTypesForService is called
      const result = resourceTypesForService("s3")

      //Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe("resourceTypeExists", () => {
    it("should return true if the resource type exists", () => {
      //Given a resource type that exists
      //When resourceTypeExists is called
      const result = resourceTypeExists("s3", "bucket")

      //Then result should be true
      expect(result).toBe(true)
    })

    it("should return false if the resource type does not exist", () => {
      //Given a resource type that does not exist
      //When resourceTypeExists is called
      const result = resourceTypeExists("s3", "FakeResourceType")

      //Then result should be false
      expect(result).toBe(false)
    })
  })

  describe("getResourceTypeDetails", () => {
    it("should return the details of the resource type", () => {
      //Given a resource type that exists
      //When getResourceTypeDetails is called
      const result = getResourceTypeDetails("s3", "bucket")

      //Then result should be the details of the resource type
      expect(result).toHaveProperty("key", "bucket")
    })

    it("should throw an error if the resource type does not exist", () => {
      //Given a resource type that does not exist
      //When getResourceTypeDetails is called
      //Then an error should be thrown
      expect(() => getResourceTypeDetails("s3", "FakeResourceType")).toThrow("Resource type FakeResourceType does not exist for service s3")
    })
  })
})