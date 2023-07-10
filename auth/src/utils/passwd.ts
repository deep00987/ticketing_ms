import {scrypt, randomBytes, timingSafeEqual} from 'crypto';
import {promisify} from 'util';
 
const asyncScrypt = promisify(scrypt);

//TODO: add try catch

export class Password{
    static async toHashString(password: string) {
        const salt = randomBytes(16).toString('hex');
        const buffer = (await asyncScrypt(password, salt, 64)) as Buffer
        return `${buffer.toString('hex')}.${salt}`
    }

    static async compare(originalPass: string, sourcePass: string){
        const [hash, salt] = originalPass.split('.');
        const sourceKeyBuffer = Buffer.from(hash, 'hex');
        const derivedKey = (await asyncScrypt(sourcePass, salt, 64)) as Buffer
        return timingSafeEqual(sourceKeyBuffer, derivedKey);
    }
}