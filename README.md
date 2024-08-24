# AWS IAM Data

## Description
Contains IAM data for AWS actions, resources, and conditions based on IAM policy documents. This is intended to be used in downstream projects to provide a reference for IAM policy documents.

## Usage

```bash
npm install @cloud-copilot/iam-data
```

```typescript
import { allServiceKeys, getActionDetails, getActionsForService, getServiceName } from '@cloud-copilot/iam-data';

// Iterate through all actions in all services
for(const serviceKey of allServiceKeys()) {
  console.log(`Getting Actions for ${getServiceName(serviceKey)}`);
  const actions = getActionsForService(serviceKey);
  for(const action of actions) {
    const actionDetails = getActionDetails(serviceKey, action);
    console.log(actionDetails);
  }
}
```

## API
### Services
* `allServiceKeys()` - Returns an array of all service keys such as 's3', 'ec2', etc.
* `getServiceName(serviceKey: string)` - Returns the service name for a given service key.
* `serviceExists(serviceKey: string)` - Returns true if the service key exists.

### Actions
* `allActions(serviceKey: string)` - Returns an array of all actions for a given service key.
* `getActionDetails(action: string)` - Returns an object with the action details such as `description`, `resourceTypes`, and `conditionKeys`.
* `actionExists(action: string)` - Returns true if the action exists.

### Resources
* `allResourceTypes(serviceKey: string)` - Returns an array of all resource types for a given service key.
* `getResourceTypeDetails(serviceKey: string, resourceType: string)` - Returns an object with the resource type details such as `description`, `arnFormat`, and `conditionKeys`.
* `resourceTypeExists(serviceKey: string, resourceType: string)` - Returns true if the resource type exists.

### Conditions
* `allConditionKeys(serviceKey: string)` - Returns an array of all condition keys for a given service key.
* `getConditionKeyDetails(serviceKey: string, conditionKey: string)` - Returns an object with the condition key details such as `description`, `conditionValueTypes`, and `conditionOperators`.
* `conditionKeyExists(serviceKey: string, conditionKey: string)` - Returns true if the condition key exists.
