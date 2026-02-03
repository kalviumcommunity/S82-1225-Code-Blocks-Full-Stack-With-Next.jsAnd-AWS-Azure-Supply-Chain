import AWS from "aws-sdk";

/**
 * Fetch secrets from AWS Secrets Manager
 * In local/dev this can be mocked
 */
export async function getSecrets() {
  // Local fallback for development
  if (process.env.NODE_ENV === "development") {
    return {
      DATABASE_URL: process.env.DATABASE_URL,
      JWT_SECRET: process.env.JWT_SECRET,
    };
  }

  const client = new AWS.SecretsManager({
    region: process.env.AWS_REGION,
  });

  const response = await client
    .getSecretValue({
      SecretId: process.env.AWS_SECRET_ARN as string,
    })
    .promise();

  if (!response.SecretString) {
    throw new Error("SecretString not found");
  }

  return JSON.parse(response.SecretString);
}
