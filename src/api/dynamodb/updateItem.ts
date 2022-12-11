import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import { CredentialsInput } from 'helpers/validate-credentials';

export interface UpdateItemInput extends CredentialsInput {
  tableName: string;
  keys: Record<string, any>;
  item: any;
}

export async function updateItem({ accessKey, secretKey, region, tableName, keys, item }: UpdateItemInput) {
  const client = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  Object.keys(keys).forEach((key) => {
    delete item[key];
  });

  const attributeNames = Object.keys(item);
  const updateExpression = `SET ${attributeNames.map((k, index) => `#setAttr${index} = :setAttr${index}`).join(', ')}`;

  const expressionAttNames = attributeNames.reduce(
    (accumulator, k, index) => ({ ...accumulator, [`#setAttr${index}`]: k }),
    {},
  );
  const expressionAttValues = attributeNames.reduce(
    (accumulator, k, index) => ({
      ...accumulator,
      [`:setAttr${index}`]: item[k],
    }),
    {},
  );

  const params: UpdateItemCommandInput = {
    TableName: tableName,
    Key: marshall(keys),
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttNames,
    ExpressionAttributeValues: expressionAttValues,
    ReturnValues: 'ALL_NEW',
  };

  try {
    const data = <UpdateItemCommandOutput>await client.send(new UpdateItemCommand(params));

    return data.$metadata.httpStatusCode === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
}
