import {describe, expect, test} from '@jest/globals';
import connenctionPool from '../../database/db';
import userRepository from '../../database/UsersRespository';

describe('UsersReposity Test', () => {
  let mockedQuery;

  beforeEach(() => {
    expect.assertions(1);
    mockedQuery = jest.spyOn(connenctionPool, 'query');
  });

  test('Failing to query the database', () => {
    mockedQuery.mockImplementation(() => {
      return Promise.reject('failed to query the db');
    });
    expect(userRepository.getUserByEmail('email')).rejects.toThrow(
      'Failed to get user from the database'
    );
  });

  test('Query the database successfully', () => {
    const user = {email: 'email', password: 'password', scopes: 'scope'};
    mockedQuery.mockImplementation(() => {
      return Promise.resolve([user]);
    });
    expect(userRepository.getUserByEmail('email')).resolves.toBe(user);
  });
});
