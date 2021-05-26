'use strict';
const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.server);
const bearer = require('../src/auth/middleware/bearer.js');
const permission = require('../src/auth/middleware/acl');
process.env.SECRET = 'toe';
let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  writer: { username: 'writer', password: 'password', role: 'writer' },
  user: { username: 'user', password: 'password', role: 'user' },
};
let token = {};

describe('API V2 food', () => {
  Object.keys(users).forEach(userType => {
    describe(`when user is ${userType}`, () => {
      it('can read using get', async () => {
        const response = await request.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
      });
      //   it('can create using post', async () => {
      //     expect().to;
      //     expect().to;
      //   });
      //   it('can update using put', async () => {
      //     expect().to;
      //     expect().to;
      //   });
      //   it('can delete using delete', async () => {
      //     expect().to;
      //     expect().to;
      //   });
    });
  });

  //   describe('when user is editor', () => {
  //     it('can read using get', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can create using post', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can update using put', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can delete using delete', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //   });
  //   describe('when user is writer', () => {
  //     it('can read using get', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can create using post', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can update using put', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can delete using delete', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //   });
  //   describe('when user is user', () => {
  //     it('can read using get', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can create using post', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can update using put', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //     it('can delete using delete', async () => {
  //       expect().to;
  //       expect().to;
  //     });
  //   });
});
