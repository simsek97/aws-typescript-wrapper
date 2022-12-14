export {
  attachUserPolicy,
  createAccessKey,
  createUser,
  deactivateAccessKey,
  deleteAccessKey,
  deleteUser,
  listAccessKeys,
  listUserGroups,
  listUserInlinePolicies,
  listUserPolicies,
  listUsers,
  updateAccessKey,
} from './api/iam';
export { describeConnectorEntity, describeConnectorProfiles } from './api/appflow';
export {
  createStack,
  describeStack,
  describeStackEvents,
  describeStackResources,
  enableTerminationProtection,
  listStacks,
  updateStack,
} from './api/cloudformation';
export { scanTable, getItem, putItem, updateItem, deleteItem } from './api/dynamodb';
export { putDashboard } from './api/cloudwatch';
export { getObject, listObjects, putObject } from './api/s3';
export { getSecretValue } from './api/secretsmanager';
export { describeExecution, getExecutionHistory, listExecutions, startExecution } from './api/sfn';
export { subscribe } from './api/sns';
