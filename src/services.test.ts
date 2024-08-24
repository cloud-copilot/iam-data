import { allServiceKeys, getServiceName, serviceExists } from "./services";

describe('services', () => {
  describe('allServiceKeys', () => {
    it('should return an array of strings', () => {
      //Given allServiceKeys exists
      //When allServiceKeys is called
      const result = allServiceKeys();

      //Then result should be an array of strings
      expect(Array.isArray(result)).toBe(true);
    })
  })

  describe('serviceExists', () => {
    it('should return true if the service exists', () => {
      //Given a service that exists
      //When serviceExists is called
      const result = serviceExists('s3');

      //Then result should be true
      expect(result).toBe(true);
    })

    it('should return false if the service does not exist', () => {
      //Given a service that does not exist
      //When serviceExists is called
      const result = serviceExists('FakeService');

      //Then result should be false
      expect(result).toBe(false);
    })
  })

  describe('getServiceName', () => {
    it('should return the name of the service', () => {
      //Given a service that exists
      //When getServiceName is called
      const result = getServiceName('s3');

      //Then result should be the name of the service
      expect(result).toBe('Amazon S3');
    })

    it('should throw an error if the service does not exist', () => {
      //Given a service that does not exist
      //When getServiceName is called
      //Then an error should be thrown
      expect(() => getServiceName('FakeService')).toThrow('Service FakeService does not exist');
    })
  })
})