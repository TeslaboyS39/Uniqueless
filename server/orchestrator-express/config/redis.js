const Redis = require("ioredis");

const uri =
  "redis://default:bpVEForUcfhvVcOkJ9Wmvp7kAFxVWF6v@redis-17167.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:17167";
const redis = new Redis(uri);

module.exports = redis;
