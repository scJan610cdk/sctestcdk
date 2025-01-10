#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ScBestwayD4Stack } from '../lib/sc-bestway-d4-stack';
import { Scec2allD4Stack } from '../lib/sc-ec2all-d4';


const app = new cdk.App();
new ScBestwayD4Stack(app, 'ScBestwayD4Stack', {
  // env: { account: '992382386705', region: 'us-east-1' },
});

new Scec2allD4Stack(app, 'Scec2allD4Stack', {
  env: { account: '992382386705', region: 'us-east-1' },
});
