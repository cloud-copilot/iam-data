import { describe, expect, it } from 'vitest'
import { findConditionKey } from './findConditionKey'

describe('findConditionKey', () => {
  describe('Global condition keys', () => {
    it('finds exact match for AWS global condition key', async () => {
      // Given a global condition key that exists
      const conditionKey = 'aws:PrincipalArn'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:PrincipalArn')
      expect(result?.type).toBe('ARN')
    })

    it('finds exact match for AWS global condition key with different capitalization', async () => {
      // Given a global condition key with mixed case
      const conditionKey = 'AWS:PRINCIPALARN'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:PrincipalArn')
    })

    it('finds AWS global condition key with tag variable', async () => {
      // Given a global condition key with tag variable
      const conditionKey = 'aws:PrincipalTag/department'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:PrincipalTag/tag-key')
    })

    it('finds AWS global condition key with different tag variable', async () => {
      // Given a global condition key with different tag variable
      const conditionKey = 'aws:ResourceTag/environment'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:ResourceTag/tag-key')
    })

    it('returns undefined for non-existent AWS global condition key', async () => {
      // Given a non-existent AWS global condition key
      const conditionKey = 'aws:NonExistentKey'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined
      expect(result).toBeUndefined()
    })

    it('finds VpceAccount global condition key', async () => {
      // Given the VpceAccount global condition key
      const conditionKey = 'aws:VpceAccount'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:VpceAccount')
      expect(result?.type).toBe('String')
    })

    it('finds VpceOrgPaths global condition key', async () => {
      // Given the VpceOrgPaths global condition key
      const conditionKey = 'aws:VpceOrgPaths'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:VpceOrgPaths')
      expect(result?.type).toBe('ArrayOfString')
    })

    it('finds VpceOrgID global condition key', async () => {
      // Given the VpceOrgID global condition key
      const conditionKey = 'aws:VpceOrgID'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:VpceOrgID')
      expect(result?.type).toBe('String')
    })

    it('finds VpceAccount global condition key with different capitalization', async () => {
      // Given the VpceAccount global condition key with mixed case
      const conditionKey = 'AWS:VPCEACCOUNT'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:VpceAccount')
      expect(result?.type).toBe('String')
    })

    it('finds VpceOrgPaths global condition key with different capitalization', async () => {
      // Given the VpceOrgPaths global condition key with mixed case
      const conditionKey = 'aws:vpceorgpaths'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:VpceOrgPaths')
      expect(result?.type).toBe('ArrayOfString')
    })

    it('finds VpceOrgID global condition key with different capitalization', async () => {
      // Given the VpceOrgID global condition key with mixed case
      const conditionKey = 'Aws:VpceOrgId'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:VpceOrgID')
      expect(result?.type).toBe('String')
    })

    it('should return undefined for a global key that accepts a variable in the key but there is nothing after the slash', async () => {
      //Given a global context key missing the variable
      const key = 'aws:PrincipalTag/'

      //When the key is checked
      const result = await findConditionKey(key)

      //Then the result should be undefined
      expect(result).toBeUndefined()
    })
  })

  describe('Service-specific condition keys', () => {
    it('finds exact match for service condition key', async () => {
      // Given a service condition key that exists
      const conditionKey = 's3:AccessGrantScope'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('s3:AccessGrantScope')
      expect(result?.type).toBe('String')
    })

    it('finds service condition key with different capitalization', async () => {
      // Given a service condition key with mixed case
      const conditionKey = 'S3:AccessGRANTscope'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('s3:AccessGrantScope')
    })

    it('finds service condition key with variable', async () => {
      // Given a service condition key with variable
      const conditionKey = 's3:AccessPointTag/department'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('s3:AccessPointTag/${TagKey}')
    })

    it('returns undefined for non-existent service condition key', async () => {
      // Given a non-existent service condition key
      const conditionKey = 's3:NonExistentKey'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined
      expect(result).toBeUndefined()
    })
  })

  describe('Unassociated condition keys', () => {
    it('finds SAML condition key through unassociated conditions', async () => {
      // Given a SAML condition key that maps to STS service
      const conditionKey = 'saml:aud'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details from STS service
      expect(result).toBeDefined()
      expect(result?.key).toBe('saml:aud')
      expect(result?.description).toContain('SAML')
    })

    it('should return true for a service key that accepts a variable in the key', async () => {
      //Given a service context key
      const conditionKey = 's3:ExistingObjectTag/Classification'

      //When the key is checked
      const result = await findConditionKey(conditionKey)

      //Then the result should be true
      expect(result).toBeDefined()
      expect(result?.key).toBe('s3:ExistingObjectTag/<key>')
      expect(result?.type).toBe('String')
    })

    it('should return true for a service key that accepts a variable and there is a slash in the variable', async () => {
      //Given a service context key
      const conditionKey = 's3:ExistingObjectTag/Classification/Classification'

      //When the key is checked
      const result = await findConditionKey(conditionKey)

      //Then the result should be true
      expect(result).toBeDefined()
      expect(result?.key).toBe('s3:ExistingObjectTag/<key>')
      expect(result?.type).toBe('String')
    })
  })

  describe('Unassociated condition keys', () => {
    it('finds SAML condition key through unassociated conditions', async () => {
      // Given a SAML condition key that maps to STS service
      const conditionKey = 'saml:aud'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details from STS service
      expect(result).toBeDefined()
      expect(result?.key).toBe('saml:aud')
      expect(result?.description).toContain('SAML')
    })

    it('finds SAML condition key with different capitalization', async () => {
      // Given a SAML condition key with mixed case
      const conditionKey = 'SAML:AUD'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('saml:aud')
    })

    it('finds Google accounts condition key through unassociated conditions', async () => {
      // Given a Google accounts condition key that maps to STS service
      const conditionKey = 'accounts.google.com:aud'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details from STS service
      expect(result).toBeDefined()
      expect(result?.key).toBe('accounts.google.com:aud')
      expect(result?.description).toContain('Google')
    })

    it('finds another Google accounts condition key', async () => {
      // Given another Google accounts condition key
      const conditionKey = 'accounts.google.com:sub'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('accounts.google.com:sub')
      expect(result?.description).toContain('Google user ID')
    })

    it('returns undefined for non-existent unassociated condition key', async () => {
      // Given a non-existent condition key with unassociated prefix
      const conditionKey = 'saml:nonexistent'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined
      expect(result).toBeUndefined()
    })

    it('returns undefined for prefix not in unassociated conditions', async () => {
      // Given a condition key with prefix not in unassociated conditions
      const conditionKey = 'unknown:somekey'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined
      expect(result).toBeUndefined()
    })
  })

  describe('Edge cases', () => {
    it('returns undefined for condition key without colon', async () => {
      // Given a condition key without service prefix
      const conditionKey = 'invalidkey'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined
      expect(result).toBeUndefined()
    })

    it('returns undefined for empty string', async () => {
      // Given an empty condition key
      const conditionKey = ''

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined
      expect(result).toBeUndefined()
    })

    it('handles condition key with multiple colons', async () => {
      // Given a condition key with multiple colons (like Google accounts)
      const conditionKey = 'accounts.google.com:oaud'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('accounts.google.com:oaud')
    })
  })

  describe('Variable pattern matching', () => {
    it('matches service condition key with complex variable pattern', async () => {
      // Given a service condition key that should match a variable pattern
      const conditionKey = 's3:AccessPointTag/my-custom-tag'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key
      expect(result).toBeDefined()
      expect(result?.key).toBe('s3:AccessPointTag/${TagKey}')
    })

    it('matches AWS global tag condition with underscores', async () => {
      // Given an AWS tag condition with underscores
      const conditionKey = 'aws:RequestTag/my_custom_tag'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:RequestTag/tag-key')
    })

    it('matches AWS global tag condition with numbers', async () => {
      // Given an AWS tag condition with numbers
      const conditionKey = 'aws:PrincipalTag/env123'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key
      expect(result).toBeDefined()
      expect(result?.key).toBe('aws:PrincipalTag/tag-key')
    })
  })

  describe('KMS encryption context condition keys', () => {
    it('finds KMS encryption context condition key with simple context key', async () => {
      // Given a KMS encryption context condition key with a simple context key
      const conditionKey = 'kms:EncryptionContext:Environment'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
      expect(result?.description).toContain('encryption context')
      expect(result?.type).toBe('String')
    })

    it('finds KMS encryption context condition key with complex context key', async () => {
      // Given a KMS encryption context condition key with a complex context key
      const conditionKey = 'kms:EncryptionContext:aws:SecureTransport'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
      expect(result?.description).toContain('encryption context')
    })

    it('finds KMS encryption context condition key with kebab-case context key', async () => {
      // Given a KMS encryption context condition key with kebab-case
      const conditionKey = 'kms:EncryptionContext:my-app-environment'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
    })

    it('finds KMS encryption context condition key with snake_case context key', async () => {
      // Given a KMS encryption context condition key with snake_case
      const conditionKey = 'kms:EncryptionContext:data_classification'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
    })

    it('finds KMS encryption context condition key with numeric context key', async () => {
      // Given a KMS encryption context condition key with numbers
      const conditionKey = 'kms:EncryptionContext:version123'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
    })

    it('finds KMS encryption context condition key with different capitalization', async () => {
      // Given a KMS encryption context condition key with mixed case
      const conditionKey = 'KMS:ENCRYPTIONCONTEXT:Environment'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
    })

    it('finds KMS encryption context condition key with special characters', async () => {
      // Given a KMS encryption context condition key with special characters
      const conditionKey = 'kms:EncryptionContext:app.component:region'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should contain the template condition key details
      expect(result).toBeDefined()
      expect(result?.key).toBe('kms:EncryptionContext:${EncryptionContextKey}')
    })

    it('does not match partial KMS encryption context condition key', async () => {
      // Given a partial KMS encryption context condition key
      const conditionKey = 'kms:EncryptionContext'

      // When findConditionKey is called
      const result = await findConditionKey(conditionKey)

      // Then result should be undefined since it doesn't match the pattern
      expect(result).toBeUndefined()
    })
  })
})
