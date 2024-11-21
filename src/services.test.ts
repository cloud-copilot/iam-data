import { describe, expect, it } from 'vitest';
import { iamServiceExists, iamServiceKeys, iamServiceName } from "./services";

describe('services', () => {
  describe('iamServiceKeys', () => {
    it('should return an array of strings', async () => {
      //Given iamServiceKeys exists
      //When iamServiceKeys is called
      const result = await iamServiceKeys();

      //Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true);
    })
  })

  describe('iamServiceExists', () => {
    it('should return true if the service exists', async () => {
      //Given a service that exists
      const serviceName = 's3'

      //When iamServiceExists is called
      const result = await iamServiceExists(serviceName);

      //Then result should be true
      expect(result).toBe(true);
    })

    it('should return false if the service does not exist', async () => {
      //Given a service that does not exist
      const serviceName = 'FakeService'

      //When iamServiceExists is called
      const result = await iamServiceExists(serviceName);

      //Then result should be false
      expect(result).toBe(false);
    })
  })

  describe('iamServiceName', () => {
    it('should return the name of the service', async () => {
      //Given a service that exists
      const serviceName = 's3'

      //When iamServiceName is called
      const result = await iamServiceName(serviceName);

      //Then result should be the name of the service
      expect(result).toBe('Amazon S3');
    })

    it('should throw an error if the service does not exist', async () => {
      //Given a service that does not exist
      const serviceName = 'FakeService'
      //When iamServiceName is called
      //Then an error should be thrown
      await expect(
        iamServiceName(serviceName)
      ).rejects.toThrow('Service FakeService does not exist');
    })
  })
})