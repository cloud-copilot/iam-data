import { describe, expect, it } from 'vitest';
import { iamActionDetails, iamActionExists, iamActionsForService } from "./actions";

describe('actions', () => {
  describe('iamActionsForService', () => {
    it('return an array of strings', async () => {
      //Given a service that exists
      const service = 's3';

      //When iamActionsForService is called
      const result = await iamActionsForService(service);

      //Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true);
      expect(result.indexOf('GetObject')).toBeGreaterThan(-1);
    })
  })

  describe('iamActionDetails', () => {
    it('return an object with the correct keys', async () => {
      //Given a service and action that exists
      const service = 's3';
      const action = 'GetObject';

      //When iamActionDetails is called
      const result = await iamActionDetails(service, action);

      //Then result should be an object with the correct keys
      expect(result).toHaveProperty('name');
    })

    it('throws an error if the action does not exist', async () => {
      //Given a service that exists but an action that does not
      const service = 's3';
      const action = 'GetBunchesOfObjects';

      //When iamActionDetails is called
      //Then an error should be thrown
      await expect(
        iamActionDetails(service, action)
      ).rejects.toThrow('Action GetBunchesOfObjects does not exist for service s3');
    })
  })

  describe('iamActionExists', () => {
    it('returns true if the action exists', async () => {
      //Given a service and action that exists
      const service = 's3';
      const action = 'GetObject';

      //When iamActionExists is called
      const result = await iamActionExists(service, action);

      //Then result should be true
      expect(result).toBe(true);
    })

    it('returns false if the action does not exist', async () => {
      //Given a service that exists but an action that does not
      const service = 's3';
      const action = 'FakeAction';

      //When iamActionExists is called
      const result = await iamActionExists(service, action);

      //Then result should be false
      expect(result).toBe(false);
    })
  })
})