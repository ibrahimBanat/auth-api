'use strict';
const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.server);

describe('API food testing', () => {
  let id;
  let newfood = {
    name: 'pizaa',
    calories: 25,
  };
  it('should create a new food ', async () => {
    const response = await request.post('/api/v1/food').send(newfood);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('pizaa');
    expect(response.body.calories).toEqual(25);
    expect(response.body._id).toBeTruthy();

    id = response.body._id;
  });
  it('Should Read all food', async () => {
    const response = await request.get('/api/v1/food');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      { name: newfood.name, calories: 25, _id: id, __v: 0 },
    ]);
  });

  let newInfo = {
    name: 'fish',
    calories: 24,
  };
  it('should Update the food information', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send(newInfo);

    expect(response.body.name).toEqual('fish');
    expect(response.body.calories).toEqual(24);
    expect(response.body._id).toEqual(id);
  });
  it('Should Read one food Info', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('fish');
    expect(response.body.calories).toEqual(24);
    expect(response.body._id).toEqual(id);
  });
  it('Should delete  food Info', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
});
