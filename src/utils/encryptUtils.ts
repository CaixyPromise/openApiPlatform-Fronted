import crypto from 'crypto';
import CryptoJS from 'crypto-js';

class EncryptUtils
{
    get key(): Buffer
    {
        return this._key;
    }

    get iv(): Buffer
    {
        return this._iv;
    }

    private readonly _key: Buffer;
    private readonly _iv: Buffer;

    constructor()
    {
        this._key = crypto.randomBytes(32);
        this._iv = crypto.randomBytes(16);
    }

    private generateRandomDigits(n: number): string
    {
        let result = '';
        for (let i = 0; i < n; i++)
        {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    private getRandomNumberInRange(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Encrypt a string
    public encryptString(plainText: string): EncryptPackage
    {

        const cipher = crypto.createCipheriv('aes-256-cbc', this._key, this._iv);
        const _nonce = this.generateRandomDigits(this.getRandomNumberInRange(16, 64));
        // 获取时间戳
        const _timestamp = new Date().getTime().toString();
        // 拼接nonce和timestamp： timestamp + plainText + nonce
        plainText = _timestamp + "." + plainText + "." + _nonce;
        // 使用update方法对拼接后的文本进行加密
        // 第一个参数是要加密的文本
        // 第二个参数是文本的编码格式（这里是utf8）
        // 第三个参数是加密后输出的格式（这里是base64）
        let encrypted = cipher.update(plainText, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return {
            nonce: _nonce,
            timestamp: _timestamp,
            encryptedPassword: encrypted
        };
    }

    // Encrypt an object
    public encryptObject(obj: any): EncryptPackage
    {
        const jsonString = JSON.stringify(obj);
        return this.encryptString(jsonString);
    }
}

export default EncryptUtils;
