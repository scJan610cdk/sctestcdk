import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ScBestwayD4Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define an array with 2 bucket names
    //using for loop to create 2 buckets 
    const bucketNames = ['sc-d4-bestway-bucket1', 'sc-d4-bestway-bucket2'];

    for (const bucketName of bucketNames) {
      new s3.Bucket(this, bucketName, {
        versioned: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        bucketName: bucketName
      })
  
    } 
    // creating s3 bucket
   // const bucket = new s3.Bucket(this, 'MyBucket', {
   // versioned: true,
    // removalPolicy: cdk.RemovalPolicy.DESTROY,
    //  autoDeleteObjects: true,
    //  bucketName: 'sc-d4-bestway-bucket'
    // });
   
  }
}
