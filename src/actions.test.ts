import { actionExists, getActionDetails, getActionsForService } from "./actions";

describe('actions', () => {
  describe('getActionsForService', () => {
    it('return an array of strings', () => {
      //Given a service that exists
      //When getActionsForService is called
      const result = getActionsForService('s3');

      //Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true);
    })
  })

  describe('getActionDetails', () => {
    it('return an object with the correct keys', () => {
      //Given a service and action that exists
      //When getActionDetails is called
      const result = getActionDetails('s3', 'GetObject');
      //Then result should be an object with the correct keys
      expect(result).toHaveProperty('name');
    })

    it('throws an error if the action does not exist', () => {
      //Given a service that exists but an action that does not
      //When getActionDetails is called
      //Then an error should be thrown
      expect(() => getActionDetails('s3', 'GetObjects')).toThrow('Action GetObjects does not exist for service s3');
    })
  })

  describe('actionExists', () => {
    it('returns true if the action exists', () => {
      //Given a service and action that exists
      //When actionExists is called
      const result = actionExists('s3', 'GetObject');
      //Then result should be true
      expect(result).toBe(true);
    })

    it('returns false if the action does not exist', () => {
      //Given a service that exists but an action that does not
      //When actionExists is called
      const result = actionExists('s3', 'FakeAction');
      //Then result should be false
      expect(result).toBe(false);
    })
  })
})