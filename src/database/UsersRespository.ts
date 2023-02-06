import connectionPool from './db';

class UserRespository {
  async getUserByEmail(email: string): Promise<any> {
    try {
      const [rows] = await connectionPool.query(
        'SELECT Users.email,UserCredentials.password,UserCredentials.scopes FROM Users JOIN UserCredentials ON Users.userId = UserCredentials.userId WHERE Users.email = ?',
        email
      );
      return rows;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get user from the database');
    }
  }
}

export default new UserRespository();
