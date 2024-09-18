# AWS IAM Data

## Description
Contains IAM data for AWS actions, resources, and conditions based on IAM policy documents. This is intended to be used in downstream projects to provide a reference for IAM policy documents.

Published in ESM and CommonJS.

## Data Updates
Data is scanned daily and a new version is published if there are changes. The version number is updated to reflect the date of the last update and the function `iamDataUpdatedAt()` returns the date of the last data update. This process is managed outside this repo.

## Usage

```bash
npm install @cloud-copilot/iam-data
```

```typescript
import { iamServiceKeys, iamActionDetails, iamActionsForService, iamServiceName } from '@cloud-copilot/iam-data';

// Iterate through all actions in all services
const serviceKeys = await iamServiceKeys()
for(const serviceKey of serviceKeys) {
  const serviceName = await iamServiceName(serviceKey);
  console.log(`Getting Actions for ${serviceName}`);
  const actions = await iamActionsForService(serviceKey);
  for(const action of actions) {
    const actionDetails = await iamActionDetails(serviceKey, action);
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
The version is number is formatted as `major.minor.updatedAt`. The updatedAt is the date the data was last updated in the format `YYYYMMDDX` where `X` is a counter to enable publishing more than once per day if necessary. For example version `0.1.202408291` has data updated on August 29th, 2024.

The version can be accessed using the `iamDataVersion()` method.

There is also `iamDataUpdatedAt()` which returns the date the data was last updated.
