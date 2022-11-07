import {
  AppflowClient,
  ConnectorType,
  DescribeConnectorProfilesCommand,
  DescribeConnectorProfilesCommandInput,
} from '@aws-sdk/client-appflow';

export async function describeConnectorProfiles({
  accessKey,
  secretKey,
  region,
}: {
  accessKey: string;
  secretKey: string;
  region: string;
}): Promise<string[]> {
  const appFlowClient = new AppflowClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params: DescribeConnectorProfilesCommandInput = {
    connectorType: ConnectorType.SALESFORCE,
    maxResults: 100,
  };
  const names: string[] = [];

  do {
    const data = await appFlowClient.send(new DescribeConnectorProfilesCommand(params));
    params.nextToken = data.nextToken;
    names.push(...(data.connectorProfileDetails ?? []).map((connector) => connector.connectorProfileName as string));
  } while (params.nextToken);

  return names;
}
