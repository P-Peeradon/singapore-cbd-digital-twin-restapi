import express, { type Request, type Response } from 'express';
import cors from 'cors';
import route from './routes/BuildingRoute.ts'

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use('/api', route);

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