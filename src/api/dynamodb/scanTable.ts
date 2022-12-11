import { DynamoDBClient, ScanCommand, ScanCommandInput, ScanCommandOutput } from '@aws-sdk/client-dynamodb';

import { CredentialsInput } from 'helpers/validate-credentials';

export interface ScanTableInput extends CredentialsInput {
  tableName: string;
}

export async function scanTable({ accessKey, secretKey, region, tableName }: ScanTableInput) {
  const client = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params: ScanCommandInput = {
    TableName: tableName,
  };

  const data = <ScanCommandOutput>await client.send(new ScanCommand(params));

  return data.Items;
}
