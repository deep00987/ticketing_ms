import request from "supertest";
import {app} from '../../app';

it(`fails when the requesting email does't exist`, async () => {
    await request(app)
    .post(`/api/users/signin`)
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(400)
})

it(`fails when the requesting password is incorrect`, async () => {
    await request(app)
    .post(`/api/users/register`)
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)

    await request(app)
    .post(`/api/users/signin`)
    .send({
        email: 'test@test.com',
        password: 'pass'
    }).expect(400)
})

it(`sets cookie with JWT after successful signin`, async () => {
    await request(app)
    .post(`/api/users/register`)
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)

    const res = await request(app)
    .post(`/api/users/signin`)
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(200)

    expect(res.get('Set-Cookie'))
})