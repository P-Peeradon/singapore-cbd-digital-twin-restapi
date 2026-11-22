import express, { type Request, type Response } from 'express';
import cors from 'cors';
import buildingRoute from './routes/BuildingRoute.ts'
import sceneRoute from './routes/SceneRoute.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use('/api', buildingRoute);
app.use('/api', sceneRoute);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ 
        service: 'Express Application Server', 
        status: 'HEALTHY', 
        timestamp: new Date().toISOString(), 
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});