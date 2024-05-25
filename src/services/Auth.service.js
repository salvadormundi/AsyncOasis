import crypto from 'crypto';

export const  generateOtp = () => {
  return crypto.randomInt(0, 100000).toString().padStart(5, '0');
}
