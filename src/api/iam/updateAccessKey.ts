import { IAMClient, UpdateAccessKeyCommand } from "@aws-sdk/client-iam";

import { CredentialsInput } from "../../helpers/validate-credentials";

export interface UpdateAccessKeyInput extends CredentialsInput {
  userName: string;
  accessKeyId: string;
}

export async function updateAccessKey({
  accessKey,
  secretKey,
  region,
  userName,
  accessKeyId,
}: UpdateAccessKeyInput): Promise<void> {
  const client = new IAMClient({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  await client.send(
    new UpdateAccessKeyCommand({
      UserName: userName,
      AccessKeyId: accessKeyId,
      Status: "Active",
    })
  );
}
