const valid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const randomChar = () => valid[Math.floor(Math.random() * valid.length)];

export const randomString = (length: number) =>
  Array.from({ length }, randomChar).join('');
