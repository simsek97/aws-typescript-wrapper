import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import { CredentialsInput } from 'helpers/validate-credentials';

export interface DeleteItemInput extends CredentialsInput {
  tableName: string;
  keys: Record<string, any>;
}

export async function deleteItem({ accessKey, secretKey, region, tableName, keys }: DeleteItemInput) {
  const client = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params: DeleteItemCommandInput = {
    TableName: tableName,
    Key: marshall(keys),
  };

  try {
    const data = <DeleteItemCommandOutput>await client.send(new DeleteItemCommand(params));

    return data.$metadata.httpStatusCode === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
}
