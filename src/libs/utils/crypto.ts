import crypto from 'crypto';

export const randomValueHex = (len: number) =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(Math.ceil(len / 2), (err, buffer) => {
      if (err) reject(err);
      resolve(
        buffer
          .toString('hex') // convert to hexadecimal format
          .slice(0, len), // return required number of characters
      );
    });
  });

export const encodeBase64 = (
  str: string,
  options: {
    urlSafe: boolean;
  } = {
    urlSafe: true,
  },
) =>
  Buffer.from(str, 'utf-8').toString(options.urlSafe ? 'base64url' : 'base64');

export const decodeBase64 = (
  str: string,
  options: {
    urlSafe: boolean;
  } = {
    urlSafe: true,
  },
) =>
  Buffer.from(str, options.urlSafe ? 'base64url' : 'base64').toString('utf-8');
