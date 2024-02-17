import { AES, enc } from 'crypto-js';

export const getDeviceType = () => {
    if (typeof window === 'undefined') {
        // If window object is not available (server-side rendering), default to Desktop
        return 'Desktop';
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    let deviceType = '';

    const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;
    const windowsPlatforms = /(win32|win64|windows|wince)/i;
    const iosPlatforms = /(iphone|ipad|ipod)/i;

    if (macosPlatforms.test(userAgent)) {
        deviceType = 'Mac';
    } else if (iosPlatforms.test(userAgent)) {
        deviceType = 'iOS';
    } else if (windowsPlatforms.test(userAgent)) {
        deviceType = 'Windows';
    } else if (/android/.test(userAgent)) {
        deviceType = 'Android';
    } else if (!deviceType && /linux/.test(userAgent)) {
        deviceType = 'Linux';
    } else {
        deviceType = 'Unknown';
    }

    return deviceType;
};
export const encryptData = (Data) => {
    console.log("encryptData",);
    const key = "859aa1127c96a7da"
    const iv = "1b554da30e64f609"
    const encryptionKey = enc.Utf8.parse(key);
    const initializationVector = enc.Utf8.parse(iv);
    console.log("encryptionKey",encryptionKey);
    console.log("initializationVector",initializationVector);
    const encrypted = AES.encrypt(JSON.stringify(Data), encryptionKey, { initializationVector });
    return encrypted
}
export const IsEmpty = value =>
    value === undefined ||
    value === false ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
