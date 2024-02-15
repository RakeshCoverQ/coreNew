// utils/AesUtil.js

import CryptoJS, { AES, enc, lib } from 'crypto-js';

const AesUtil = function ({ key, iv }) {
    this.key = key;
    this.iv = iv;
};

AesUtil.prototype.encrypt = function (plainText) {
    const iv = enc.Utf8.parse(this.iv);
    const key = enc.Utf8.parse(this.key);

    const encrypted = AES.encrypt(plainText, key, {
        iv,
    });

    return encrypted.ciphertext.toString(enc.Base64);
};


AesUtil.prototype.decrypt = function (ciphertext) {
    const iv = enc.Utf8.parse(this.iv);
    const key = enc.Utf8.parse(this.key);

    const cipherParams = lib.CipherParams.create({
        ciphertext: enc.Base64.parse(ciphertext),
    });

    const decrypted = AES.decrypt(cipherParams, key, {
        iv,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

export default AesUtil;
