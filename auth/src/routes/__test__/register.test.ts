import request from 'supertest';
import {app} from '../../app';

it("returns 201 response on successful register", async () => {
    return request(app)
        .post('/api/users/register')
        .send({
            email: "exmaple@example.com",
            password: "password"
        })
        .expect(201);
})

it("returns 400 response on an invalid email", async () => {
    return request(app)
        .post('/api/users/register')
        .send({
            email: "exmaplexample.com",
            password: "password"
        })
        .expect(400);
})

it("returns 400 response on an invalid password", async () => {
    return request(app)
        .post('/api/users/register')
        .send({
            email: "exmaple@xample.com",
            password: "12"
        })
        .expect(400);
})

it("returns 400 response on missing field values", async () => {
    await request(app)
        .post('/api/users/register')
        .send({
            email: "example@example.com"
        })
        .expect(400);
    await request(app)
        .post('/api/users/register')
        .send({
            password: "password"
        })
        .expect(400);
    await request(app)
        .post('/api/users/register')
        .send({})
        .expect(400);
})

it("Doesn't allow request with duplicate email", async () => {
    await request(app)
    .post('/api/users/register')
    .send({
        email: "exmaple@xample.com",
        password: "1234"
    })
    .expect(201)

    await request(app)
    .post('/api/users/register')
    .send({
        email: "exmaple@xample.com",
        password: "1234"
    })
    .expect(400)

})

it("sets a cookie after successful register", async () => {
    const res = await request(app)
    .post('/api/users/register')
    .send({
        email: "exmaple@xample.com",
        password: "1234"
    })
    .expect(201)

    expect(res.get('Set-Cookie')).toBeDefined()
})