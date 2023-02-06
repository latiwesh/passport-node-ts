const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});

import {describe, expect, test} from '@jest/globals';
import usersService from '../../services/UsersService';
import userRepository from '../../database/UsersRespository';

let mockexecuteSelectQuery;

beforeEach(() => {
  expect.assertions(1);
  mockexecuteSelectQuery = jest.spyOn(userRepository, 'getUserByEmail');
});

describe('Users Service Tests', () => {
  test('testing a valid user in the db', () => {
    const user = {email: 'email', password: 'password'};
    mockexecuteSelectQuery.mockImplementation(() => Promise.resolve([user]));
    expect(usersService.findUser(user.email)).resolves.toEqual(user);
  });

  test('User not found in db', () => {
    mockexecuteSelectQuery.mockImplementation(() => Promise.resolve([]));
    expect(usersService.findUser('email')).rejects.toThrow('User is not foud');
  });

  test('DB Call failure', async () => {
    mockexecuteSelectQuery.mockImplementation(() => {
      throw new Error('Failed to get users from the db');
    });
    expect(usersService.findUser('email')).rejects.toThrow(
      'Failed to get users from the db'
    );
  });
});
