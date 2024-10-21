import cluster from 'cluster';
import os from 'os';
import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const numCPUs = os.cpus().length; // Get the number of available CPUs

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs - 1; i++) {
    console.log(`Forking worker ${i + 1}`);
    cluster.fork();
  }

  // Listen for workers exiting and respawn if necessary
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork(); // Fork a new worker when one dies
  });

} else {
  // Workers can share any TCP connection
  const app = express();
  app.use(express.json());
  app.use('/api/users', userRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
  });

  // Log worker creation
  console.log(`Worker ${process.pid} is running`);

  const port = process.env.PORT ? parseInt(process.env.PORT) + (cluster.worker?.id || 0) : 3000 + (cluster.worker?.id || 0);

  app.listen(port, () => {
    console.log(`Worker ${process.pid} is listening on port ${port}`);
  });
}
