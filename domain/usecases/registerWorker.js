import { hash } from 'bcryptjs';
import Worker from '../domain/entities/Worker';

export default function makeRegisterWorker({ workerRepository }) {
  return async function registerWorker({ name, email, password }) {
    const existingWorker = await workerRepository.findByEmail(email);
    if (existingWorker) {
      throw new Error('Worker already exists');
    }

    const hashedPassword = await hash(password, 10);
    const worker = new Worker({ name, email, password: hashedPassword });

    return workerRepository.save(worker);
  };
};
