# AWS IAM Data

## Description
Contains IAM data for AWS actions, resources, and conditions based on IAM policy documents. This is intended to be used in downstream projects to provide a reference for IAM policy documents.

## Usage

```bash
npm install @cloud-copilot/iam-data
```

```typescript
import { iamServiceKeys, iamActionDetails, iamActionsForService, iamServiceName } from '@cloud-copilot/iam-data';

// Iterate through all actions in all services
for(const serviceKey of iamServiceKeys()) {
  console.log(`Getting Actions for ${iamServiceName(serviceKey)}`);
  const actions = iamActionsForService(serviceKey);
  for(const action of actions) {
    const actionDetails = iamActionDetails(serviceKey, action);
    console.log(actionDetails);
  }
}
```

## API
### Services
* `iamServiceKeys()` - Returns an array of all service keys such as 's3', 'ec2', etc.
* `iamServiceName(serviceKey: string)` - Returns the service name for a given service key.
* `iamServiceExists(serviceKey: string)` - Returns true if the service key exists.

### Actions
* `iamActionsForService(serviceKey: string)` - Returns an array of all actions for a given service key.
* `iamActionDetails(serviceKey: string, actionKey: string)` - Returns an object with the action details such as `description`, `resourceTypes`, and `conditionKeys`.
* `iamActionExists(serviceKey: string, actionKey: string)` - Returns true if the action exists.

### Resources
* `iamResourceTypesForService(serviceKey: string)` - Returns an array of all resource types for a given service key.
* `iamResourceTypeDetails(serviceKey: string, resourceTypeKey: string)` - Returns an object with the resource type details such as `description`, `arnFormat`, and `conditionKeys`.
* `iamResourceTypeExists(serviceKey: string, resourceTypeKey: string)` - Returns true if the resource type exists.

### Conditions Keys
* `iamConditionKeysForService(serviceKey: string)` - Returns an array of all condition keys for a given service key.
* `iamConditionKeyDetails(serviceKey: string, conditionKey: string)` - Returns an object with the condition key details such as `description`, `conditionValueTypes`, and `conditionOperators`.
* `iamConditionKeyExists(serviceKey: string, conditionKey: string)` - Returns true if the condition key exists.

### Version Info
The version is numper is formatted as `major.minor.updatedAt`. The updatedAt is the date the data was last updated in the format `YYYYMMDDX` where `X` is a counter to enable deploying more than once per day if necessary. For example version `0.1.202408291` has data updated on August 29th, 2024.

The version can be accessed using the `iamDataVersion()` method.
