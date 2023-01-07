require("dotenv").config({path:__dirname+'/../../.env'});
const fs = require("fs").promises;
const path = require("path");
import * as p12 from 'p12-pem'
const forge = require('node-forge');

const keystorePath = path.join(__dirname,"../../keystore.p12");

const getRSAKeys = () => {

const {pemKey} = p12.getPemFromP12(keystorePath, 'somepass');


let privateKeyContent = '-----BEGIN RSA PRIVATE KEY-----\n'+pemKey.substring(31, pemKey.indexOf('-----END RSA PRIVATE KEY-----'))+'\n'+'-----END RSA PRIVATE KEY-----';

// convert PEM-formatted private key to a Forge private key
var forgePrivateKey = forge.pki.privateKeyFromPem(privateKeyContent);

// get a Forge public key from the Forge private key
var forgePublicKey = forge.pki.setRsaPublicKey(forgePrivateKey.n, forgePrivateKey.e);

// convert the Forge public key to a PEM-formatted public key
var publicKey = forge.pki.publicKeyToPem(forgePublicKey);

let keys = {
  privateKey: privateKeyContent,
  publicKey: publicKey
}
return keys;
}

export {
    getRSAKeys,
};