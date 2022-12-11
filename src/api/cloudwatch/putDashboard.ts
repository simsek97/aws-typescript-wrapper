import { CloudWatchClient, PutDashboardCommand, PutDashboardCommandInput } from '@aws-sdk/client-cloudwatch';

import { CredentialsInput } from 'helpers/validate-credentials';

export interface PutDashboardInput extends CredentialsInput {
  name: string;
  dashboardJson: string;
}

export async function putDashboard({
  accessKey,
  secretKey,
  region,
  name,
  dashboardJson,
}: PutDashboardInput): Promise<void> {
  const client = new CloudWatchClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params: PutDashboardCommandInput = {
    DashboardName: name,
    DashboardBody: dashboardJson,
  };

  await client.send(new PutDashboardCommand(params));
}
