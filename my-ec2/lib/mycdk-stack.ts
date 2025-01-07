import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MycdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // creating s3 bucket using L1 construct
    const sc1 = new s3.CfnBucket(this, 'sc1bucket' , {
           bucketName: 'sc-bmo-bucket',
           versioningConfiguration: {
           status: 'Enabled'
    },
    accessControl: 'Private'
    });
  }
}
