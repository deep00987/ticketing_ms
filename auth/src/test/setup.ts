import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';


declare global {
    var signin: () => Promise<string[]>;
}



let mongoMemDb: any;

//runs before all events [start up]
beforeAll(async () => {
    process.env.JWT_KEY = `Fji9f3y14p/nJhn5X+Qf8WXZAwa7poOEcYDimKjqGgjrbQjTQhs6cj46+1P/Uk6w`;
    mongoMemDb = await MongoMemoryServer.create();
    const mongoUri = mongoMemDb.getUri();
    await mongoose.connect(mongoUri)

})
//before each test
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections){
        await collection.deleteMany();
    }

})

afterAll(async () => {
    await mongoMemDb.stop();
    await mongoose.connection.close();
})

global.signin = async () => {
    const email = 'test@test.com'
    const password = 'password'

    const res = await request(app)
    .post('/api/users/register')
    .send({
        email,
        password
    })

    const cookie = res.get('Set-Cookie')

    return cookie;

}