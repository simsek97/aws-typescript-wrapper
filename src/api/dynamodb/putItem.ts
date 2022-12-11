import { DynamoDBClient, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { CredentialsInput } from 'helpers/validate-credentials';

export interface PutItemInput extends CredentialsInput {
  tableName: string;
  item: any;
}

export async function putItem({ accessKey, secretKey, region, tableName, item }: PutItemInput) {
  const client =
    accessKey && secretKey
      ? new DynamoDBClient({
          region,
          credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
          },
        })
      : new DynamoDBClient({
          region,
        });

  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: item,
  };

  try {
    const data = <PutItemCommandOutput>await client.send(new PutItemCommand(params));

    return data.$metadata.httpStatusCode === 204;
  } catch (error) {
    console.log(error);

    return false;
  }
}
