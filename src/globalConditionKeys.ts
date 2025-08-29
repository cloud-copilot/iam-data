import { ConditionKey } from './conditionKeys.js'

interface GlobalConditionKey extends ConditionKey {
  category: string
}

export const globalConditionKeys: GlobalConditionKey[] = [
  {
    key: 'aws:PrincipalArn',
    category: 'principal',
    type: 'ARN',
    description: ''
  },
  {
    key: 'aws:PrincipalAccount',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:PrincipalOrgPaths',
    category: 'principal',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:PrincipalOrgID',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:PrincipalTag/tag-key',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:PrincipalIsAWSService',
    category: 'principal',
    type: 'Bool',
    description: ''
  },
  {
    key: 'aws:PrincipalServiceName',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:PrincipalServiceNamesList',
    category: 'principal',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:PrincipalType',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:userid',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:username',
    category: 'principal',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:AssumedRoot',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:FederatedProvider',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:TokenIssueTime',
    category: 'session',
    type: 'Date',
    description: ''
  },
  {
    key: 'aws:MultiFactorAuthAge',
    category: 'session',
    type: 'Numeric',
    description: ''
  },
  {
    key: 'aws:MultiFactorAuthPresent',
    category: 'session',
    type: 'Bool',
    description: ''
  },
  {
    key: 'aws:ChatbotSourceArn',
    category: 'session',
    type: 'ARN',
    description: ''
  },
  {
    key: 'aws:Ec2InstanceSourceVpc',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:Ec2InstanceSourcePrivateIPv4',
    category: 'session',
    type: 'IPAddress',
    description: ''
  },
  {
    key: 'aws:SourceIdentity',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'ec2:RoleDelivery',
    category: 'session',
    type: 'Numeric',
    description: ''
  },
  {
    key: 'ec2:SourceInstanceArn',
    category: 'session',
    type: 'ARN',
    description: ''
  },
  {
    key: 'glue:RoleAssumedBy',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'glue:CredentialIssuingService',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'lambda:SourceFunctionArn',
    category: 'session',
    type: 'ARN',
    description: ''
  },
  {
    key: 'ssm:SourceInstanceArn',
    category: 'session',
    type: 'ARN',
    description: ''
  },
  {
    key: 'identitystore:UserId',
    category: 'session',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:SourceIp',
    category: 'network',
    type: 'IPAddress',
    description: ''
  },
  {
    key: 'aws:SourceVpc',
    category: 'network',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:SourceVpce',
    category: 'network',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:VpceAccount',
    category: 'network',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:VpceOrgPaths',
    category: 'network',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:VpceOrgID',
    category: 'network',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:VpcSourceIp',
    category: 'network',
    type: 'IPAddress',
    description: ''
  },
  {
    key: 'aws:ResourceAccount',
    category: 'resource',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:ResourceOrgID',
    category: 'resource',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:ResourceOrgPaths',
    category: 'resource',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:ResourceTag/tag-key',
    category: 'resource',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:CalledVia',
    category: 'request',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:CalledViaFirst',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:CalledViaLast',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:ViaAWSService',
    category: 'request',
    type: 'Bool',
    description: ''
  },
  {
    key: 'aws:CurrentTime',
    category: 'request',
    type: 'Date',
    description: ''
  },
  {
    key: 'aws:EpochTime',
    category: 'request',
    type: 'Date', //Can Also be Numeric...
    description: ''
  },
  {
    key: 'aws:referer',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:RequestedRegion',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:RequestTag/tag-key',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:TagKeys',
    category: 'request',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:SecureTransport',
    category: 'request',
    type: 'Bool',
    description: ''
  },
  {
    key: 'aws:SourceArn',
    category: 'request',
    type: 'ARN',
    description: ''
  },
  {
    key: 'aws:SourceAccount',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:SourceOwner',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:SourceOrgPaths',
    category: 'request',
    type: 'ArrayOfString',
    description: ''
  },
  {
    key: 'aws:SourceOrgID',
    category: 'request',
    type: 'String',
    description: ''
  },
  {
    key: 'aws:UserAgent',
    category: 'request',
    type: 'String',
    description: ''
  }
]

export const globalConditionKeysByName = globalConditionKeys.reduce(
  (acc, key) => {
    acc[key.key.toLowerCase()] = key
    return acc
  },
  {} as Record<string, GlobalConditionKey>
)

export const globalVariableConditionKeysByPrefix = globalConditionKeys.reduce(
  (acc, key) => {
    if (key.key.includes('/')) {
      acc[key.key.split('/')[0].toLowerCase()] = key
    }
    return acc
  },
  {} as Record<string, GlobalConditionKey>
)
