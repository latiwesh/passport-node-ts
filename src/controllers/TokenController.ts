import userService from "../services/UsersService";
import authenticationService from "../services/AuthenticationService";


class TokenController {

    async authenticateUser (req, res, next){
        try {
            const {email, password} = req.body;
    
          const user = await userService.findUser(email);
    
           const isPasswordValid  = await authenticationService.validateUserCredentials(password,  user.password);
           if(!isPasswordValid){
            res.status(401).json({message: 'username or password are not valid'});
           }
            else{
                const token = await authenticationService.getToken(user);
                res.status(200).json(token);
            } 
        } catch (error) {
            next(error);
        }
    };

    async getJWK(req, res, next){
        try{
            const jwk = await authenticationService.getJWK();
            res.status(200).json(jwk);
        } catch(error){
            next(error);
        }
    };
}

export default new TokenController();