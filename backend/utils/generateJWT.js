import jwt from 'jsonwebtoken';

export default async (payload) => {
  const token = jwt.sign(
    payload,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET_KEY,
    { expiresIn: '10h' }
  );

  return token;
};
