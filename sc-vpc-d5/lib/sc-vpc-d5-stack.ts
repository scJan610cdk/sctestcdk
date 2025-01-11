import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ScVpcD5Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  const vpc = new ec2.Vpc(this, 'scd5-vpc', {
    cidr: '10.11.0.0/24',
    maxAzs: 2,
    subnetConfiguration: [
    {
      cidrMask: 28,
      name: 'scd5-PublicSubnet1',
      subnetType: ec2.SubnetType.PUBLIC,
    },
    {
      cidrMask: 28,
      name: 'scd5-PublicSubnet2',
      subnetType: ec2.SubnetType.PUBLIC,
    },
    ],
  });
    
    // });
  }
}
