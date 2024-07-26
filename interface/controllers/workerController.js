export default function makeWorkerController({ registerWorker, loginWorker }) {
    return {
      async register(req, res) {
        const { name, email, password } = req.body;
        try {
          const worker = await registerWorker({ name, email, password });
          res.status(201).json(worker);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      },
      async login(req, res) {
        const { email, password } = req.body;
        try {
          const token = await loginWorker({ email, password });
          res.json(token);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }
    };
  };
  