import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Scd5Project1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new cdk.aws_dynamodb.Table(this, 'scd5-Table', {
      partitionKey: { name: 'BucketName', type: cdk.aws_dynamodb.AttributeType.STRING },
      tableName: 'scd5-table',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    // lambda function
    const scd5Function = new lambda.Function(this, 'scd5Function', {
      runtime: lambda.Runtime.PYTHON_3_10,
      handler: 'index.handler',
      functionName: 'scd5-function', // added manually
      code: lambda.Code.fromInline(`
import time
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('scd5-table')

def handler(event, context):
    s3 = boto3.client('s3')
    response = s3.list_buckets()
    buckets = [bucket['Name'] for bucket in response['Buckets']]
    print("S3 Buckets:", buckets)
    
    for bucket in buckets:
      table.put_item(Item={'BucketName': bucket})
    
    return {
      'statusCode': 200,
      'body': 'S3 Buckets: ' + ', '.join(buckets)
    }`),
    });
    // Grant the Lambda function permissions to access S3 buckets

    const s3Policy = new cdk.aws_iam.PolicyStatement({
      actions: ['s3:ListAllMyBuckets'],
      resources: ['arn:aws:s3:::*'],
    });

    scd5Function.addToRolePolicy(s3Policy);
    // CloudWatch Event Rule to trigger Lambda function every 5 minutes
    const rule = new cdk.aws_events.Rule(this, 'Rule', {
      schedule: cdk.aws_events.Schedule.rate(cdk.Duration.minutes(3)),
    });

    rule.addTarget(new cdk.aws_events_targets.LambdaFunction(scd5Function));
    // Grant the Lambda function permissions to access the DynamoDB table
    table.grantReadWriteData(scd5Function);
    
  }
}
