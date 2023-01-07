require("dotenv").config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {getRSAKeys} from "../utils/auth";
import pem2jwk from 'pem-jwk';

class AuthenticationService {

    async validateUserCredentials(providedPassowrd: string, userPassword: string ): Promise<Boolean>{

        const isPassportValid = await bcrypt.compare(providedPassowrd, userPassword);

        if(!isPassportValid){
            console.log("Username or password are not valid")
            const err = new Error("Username or password are not valid");
            throw err;
        }
        
        return isPassportValid;
    }

    async getToken(user: User): Promise<string>{
        const {privateKey} = getRSAKeys();
        return jwt.sign({id: user.userId, scopes: user.scopes}, privateKey, {expiresIn: 24 * 60 * 60, algorithm: 'RS256'});
    }

    async getJWK(): Promise<any> {
        const {publicKey} = getRSAKeys();
        const jwk  = pem2jwk.pem2jwk(publicKey);
        return jwk;
    }

}



export default new AuthenticationService();