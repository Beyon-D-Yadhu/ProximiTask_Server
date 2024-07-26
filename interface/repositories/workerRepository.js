import WorkerModel, { findOne } from '../../infrastructure/db/workerModel.js';

export async function findByEmail(email) {
    return findOne({ email });
}
export async function save(worker) {
    const newWorker = new WorkerModel(worker);
    return newWorker.save();
}
