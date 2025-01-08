import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class scEc2VpcD3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // usering default vpc
    const vpc = ec2.Vpc.fromLookup(this,'scvpc',{
        isDefault: true
    });
    // creating ec2 instance
    const scvm = new ec2.Instance(this,'scvm1',{
         vpc,
         instanceType: new ec2.InstanceType('t2.micro'),
         machineImage: new ec2.AmazonLinuxImage(),
         keyPair: ec2.KeyPair.fromKeyPairName(this,'sckey','splunk-key'),
        //       splunk-key is original key name of aws account
        // so you have to use the same
        instanceName: 'sc-linux-vm'
 // above name of my linux machine 
    });
  }
  // print 
  // new cdk.CfnOutput(this,'scIID',{
  //     description: 'this will print instance id',
  //    value: scvm.instanceId,
  // });
  // new cdk.CfnOutput(this,'scIN',{
  //   description: 'print IN',  
  //    value: scvm.instancePublicDnsName
  // });
}
