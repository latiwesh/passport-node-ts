const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});

import {describe, expect, test} from '@jest/globals';
import usersService from '../../services/UsersService';
import userRepository from '../../DB/DBRepository';

describe('Users Service Tests', () => {
  test('testing a valid user in the db', async () => {
    expect.assertions(1);
    const mockexecuteSelectQuery = jest.spyOn(
      userRepository,
      'executeSelectQuery'
    );
    const user = {email: 'email', password: 'password'};
    mockexecuteSelectQuery.mockImplementation(() => Promise.resolve([user]));
    const result = await usersService.findUser(user.email);
    expect(result).toEqual(user);
  });
});
