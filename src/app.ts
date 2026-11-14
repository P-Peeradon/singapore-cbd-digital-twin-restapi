import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ 
        service: 'Express Application Server', 
        status: 'HEALTHY', 
        timestamp: new Date().toISOString(), 
    });
});

// Baseline Building Route Scaffolding 
app.get('/api/buildings', (req: Request, res: Response) => { 
    res.status(200).json({ 
        type: 'FeatureCollection', 
        features: [ 
            { 
                type: 'Feature', 
                properties: { 
                    buildingId: 'SG-CBD-MBFC-T1', 
                    name: 'Marina Bay Financial Centre Tower 1', 
                    heightMeters: 186.0, 
                    storeys: 33, 
                    bcaRating: 'Green Mark Platinum', 
                }, 
                geometry: { 
                    type: 'Polygon', 
                    coordinates: [ 
                        [ 
                            [103.8541, 1.2801], 
                            [103.8547, 1.2801], 
                            [103.8547, 1.2808], 
                            [103.8541, 1.2808], 
                            [103.8541, 1.2801], 
                        ], 
                    ], 
                }, 
            }, 
        ], 
    }); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});