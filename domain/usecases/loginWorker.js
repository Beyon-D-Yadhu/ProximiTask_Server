import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export default function makeLoginWorker({ workerRepository, jwtSecret }) {
  return async function loginWorker({ email, password }) {
    const worker = await workerRepository.findByEmail(email);
    if (!worker) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await compare(password, worker.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: worker.id };
    const token = sign(payload, jwtSecret, { expiresIn: '1h' });

    return { token };
  };
};
