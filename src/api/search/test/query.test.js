const { app } = require('../src');
const { Client } = require('@elastic/elasticsearch');
const Mock = require('@elastic/elasticsearch-mock');

const mock = new Mock();
const client = new Client({
  node: 'http://localhost:4445',
  Connection: mock.getConnection(),
});
// const supertest = require('supertest');
const request = require('supertest');
// const request = supertest('http://localhost:9200');

describe('/query routers', () => {
  beforeAll(() => {
    mock.add(
      {
        method: 'GET',
        path: '/',
      },
      () => {
        return { status: 'ok' };
      }
    );
    mock.add(
      {
        method: 'GET',
        path: '/count',
      },
      () => {
        return { count: 42 };
      }
    );
    mock.add(
      {
        method: 'GET',
        path: '/query?text=Telescope&filter=post&page=0',
      },
      () => {
        return {
          results: 1,
          values: [
            {
              id: '174e5e6611',
              url: 'http://localhost/v1/posts/174e5e6611',
            },
          ],
        };
      }
    );
    mock.add(
      {
        method: 'GET',
        path: '/uery?text=Telescope&filter=post&page=0',
      },
      () => {
        return ResponseError({ body: {}, statusCode: 500 });
      }
    );
  });

  it('return error 400 if no params given', async () => {
    client.info(console.log);
    const fn = mock.get({
      method: 'GET',
      path: '/count',
    });
    console.log(`*************************************: ${fn.info}`);
    const res = await request(app).get('/uery?text=Telescope&filter=post&page=0');
    // console.log(res);
    // const res = await request(app).get('/');
    // const res = await request.get('/');
    expect(res.status).toBe(500);
    // expect(res.get('Content-Type')).toContain('/json/');
    expect(res.body.length).toBeGreaterThan(0);
    // await request
    //   .get(`api/users`) // get() of supertest
    //   // .set('Authorization', `Token ${request.token}`)
    //   .expect(200);
  });
});
