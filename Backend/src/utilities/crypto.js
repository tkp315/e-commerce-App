import crypto from 'crypto';

// Ensure that your ENCRYPTION_KEY is a 64-character hexadecimal string (32 bytes)
const algorithm = 'aes-256-cbc';

// Read the encryption key from the environment variable and ensure it's a valid length
const keyHex = process.env.ENCRYPTION_KEY;
if (!keyHex || keyHex.length !== 64) {
  throw new Error('Invalid ENCRYPTION_KEY. It must be a 64-character hexadecimal string.');
}
const key = Buffer.from(keyHex, 'hex');

const encryption = (text) => {
  try {
    const iv = crypto.randomBytes(16); // New IV for each encryption
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const encryptedText = iv.toString('hex') + ':' + encrypted;
    console.log('Encryption successful:', encryptedText); // Debugging log

    return encryptedText;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption failed');
  }
};

const decryption = (text) => {
  try {
    const textParts = text.split(':');
    if (textParts.length !== 2) {
      throw new Error('Invalid encrypted text format.');
    }
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = textParts[1];

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('Decryption successful:', decrypted); // Debugging log

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
};

export { encryption, decryption };
