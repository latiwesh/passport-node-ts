
import userRepository from '../DB/DBRepository';

class UserService{

   async findUser (email: string) : Promise<User> {
    let query = 'SELECT Users.email,UserCredentials.password FROM Users JOIN UserCredentials ON Users.userId = UserCredentials.userId WHERE Users.email = ' +"'"+ email +"'";
    const users =  await userRepository.executeSelectQuery(query);
    
    if (!users) {
      console.log("User is not foud")
      const err = new Error("Provided credentials are not valid");
      throw err;
    }
    
    return users[0];
   }
}


export default new UserService();