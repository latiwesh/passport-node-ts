import userRepository from '../database/UsersRespository';

class UserService {
  async findUser(email: string): Promise<User> {
    const users = await userRepository.getUserByEmail(email);

    if (!users || users.length === 0) {
      console.log('User is not foud');
      const err = new Error('User is not foud');
      throw err;
    }

    return users[0];
  }
}

export default new UserService();
