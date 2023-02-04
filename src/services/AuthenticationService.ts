require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getRSAKeys} from '../utils/auth';
import pem2jwk from 'pem-jwk';

class AuthenticationService {
  async validateUserCredentials(
    providedPassowrd: string,
    userPassword: string
  ): Promise<Boolean> {
    const isPassportValid = await bcrypt.compare(
      providedPassowrd,
      userPassword
    );

    if (!isPassportValid) {
      console.log('Username or password are not valid');
      const err = new Error('Username or password are not valid');
      throw err;
    }

    return isPassportValid;
  }

  async getToken(user: User): Promise<Token> {
    const {privateKey} = getRSAKeys();
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign(
      {id: user.userId, scopes: user.scopes},
      privateKey,
      {expiresIn: 24 * 60 * 60, algorithm: 'RS256'}
    );
    const token: Token = {
      access_token: accessToken,
      scope: user.scopes,
      expires_in: expiresIn,
    };
    return token;
  }

  async getJWK(): Promise<any> {
    const {publicKey} = getRSAKeys();
    const jwk = pem2jwk.pem2jwk(publicKey);
    return jwk;
  }
}

export default new AuthenticationService();
