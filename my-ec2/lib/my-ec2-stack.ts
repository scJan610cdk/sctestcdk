import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class scEc2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define default vpc to use from existing aws region 
       const vpc = ec2.Vpc.fromLookup(this,'ExistingVPC' ,{
           isDefault: true
       });
    // creating ec2 instace 
       const scinstance = new ec2.Instance(this,'scmachine',{
	      vpc,  
	      instanceType: new ec2.InstanceType('t2.micro'),
              machineImage: new ec2.AmazonLinuxImage(),
              keyName: 'splunk-key',
        });
  }
}
