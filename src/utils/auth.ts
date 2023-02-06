const path = require('path');
import * as p12 from 'p12-pem';
const forge = require('node-forge');

const keystorePath = path.join(__dirname, '../../keystore.p12');

const getRSAKeys = () => {
  const {pemKey} = p12.getPemFromP12(keystorePath, 'somepass');

  const privateKeyContent =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    pemKey.substring(31, pemKey.indexOf('-----END RSA PRIVATE KEY-----')) +
    '\n' +
    '-----END RSA PRIVATE KEY-----';

  // convert PEM-formatted private key to a Forge private key
  const forgePrivateKey = forge.pki.privateKeyFromPem(privateKeyContent);

  // get a Forge public key from the Forge private key
  const forgePublicKey = forge.pki.setRsaPublicKey(
    forgePrivateKey.n,
    forgePrivateKey.e
  );

  // convert the Forge public key to a PEM-formatted public key
  const publicKey = forge.pki.publicKeyToPem(forgePublicKey);

  const keys = {
    privateKey: privateKeyContent,
    publicKey: publicKey,
  };
  return keys;
};

export {getRSAKeys};
