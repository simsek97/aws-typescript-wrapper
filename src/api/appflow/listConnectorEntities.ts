import _get from "lodash/get";
import {
  AppflowClient,
  ConnectorType,
  ListConnectorEntitiesCommand,
  ListConnectorEntitiesCommandInput,
} from "@aws-sdk/client-appflow";

export interface IRawObject {
  name: string;
  label: string;
}

interface IListObjects {
  accessKey: string;
  secretKey: string;
  region: string;
  connectionName: string;
}

export async function listConnectorEntities({
  accessKey,
  secretKey,
  region,
  connectionName,
}: IListObjects): Promise<IRawObject[]> {
  const appFlowClient = new AppflowClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params: ListConnectorEntitiesCommandInput = {
    connectorType: ConnectorType.SALESFORCE,
    connectorProfileName: connectionName,
  };
  const data = await appFlowClient.send(
    new ListConnectorEntitiesCommand(params)
  );
  const objects = _get(data, "connectorEntityMap.Objects", []);

  return objects.map((obj: { name: string; label: string }) => ({
    name: obj.name,
    label: obj.label,
  }));
}
