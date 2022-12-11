import { DynamoDBClient, GetItemCommand, GetItemCommandInput, GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

import { CredentialsInput } from 'helpers/validate-credentials';

export interface GetItemInput extends CredentialsInput {
  tableName: string;
  key: Record<string, any>;
}

export async function getItem({ accessKey, secretKey, region, tableName, key }: GetItemInput) {
  const client = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params: GetItemCommandInput = {
    TableName: tableName,
    Key: marshall(key),
  };

  try {
    const data = <GetItemCommandOutput>await client.send(new GetItemCommand(params));

    if (data.$metadata.httpStatusCode === 200) {
      return unmarshall(data.Item as any);
    } else {
      return 'Error occurred';
    }
  } catch (error) {
    console.log(error);

    return false;
  }
}
