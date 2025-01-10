import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Scec2allD4Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // usering default vpc
    const vpc = ec2.Vpc.fromLookup(this,'scvpc',{
        isDefault: true
    });

    // create security group
    const securityGroup = new ec2.SecurityGroup(this, 'scSecurityGroup', {
      vpc,
      description: 'Allow ssh, http, https, and ftp access',
      allowAllOutbound: true
    });

    // allow inbound traffic on port 21 (FTP) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(21), 'allow ftp access from anywhere');

    // allow inbound traffic on port 22 (SSH) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow ssh access from anywhere');
    // allow inbound traffic on port 80 (HTTP) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http access from anywhere');

    // allow inbound traffic on port 443 (HTTPS) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'allow https access from anywhere');

    // creating ec2 instance
    const scvm = new ec2.Instance(this,'scvm1',{
         vpc,
         instanceType: new ec2.InstanceType('t2.micro'),
         machineImage: new ec2.AmazonLinuxImage(),
         keyPair: ec2.KeyPair.fromKeyPairName(this,'sckey','splunk-key'),
         securityGroup, // attach the security group to the instance
        //       splunk-key is original key name of aws account
        // so you have to use the same
        instanceName: 'sc-linux-vm'
 // above name of my linux machine 
    });
  // print  instance id
     new cdk.CfnOutput(this,'scInstanceID',{
         description: 'this will print instance id',
         value: scvm.instanceId,
     });
      // printing public dns 
      new cdk.CfnOutput(this,'scvmpublicdns',{
         value: scvm.instancePublicDnsName
     });
  }
}
