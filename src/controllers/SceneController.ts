import { type Request, type Response } from 'express'; 

export interface CameraPreset { 
    id: string; 
    name: string; 
    position: { 
        x: number; 
        y: number; 
        z: number 
    }; 
    target: { 
        x: number; 
        y: number; 
        z: number 
    }; 
    fov: number; 
}

export const getSceneConfig = (req: Request, res: Response) => { 
    res.status(200).json({ 
        district: 'Singapore Central Business District', 
        anchorCoordinates: { 
            longitude: 103.8544, 
            latitude: 1.28045 
        }, 
        defaultCamera: { 
            position: { x: 0, y: 250, z: 400 }, 
            target: { x: 0, y: 0, z: 0 }, 
            fov: 45, 
            near: 0.1, 
            far: 2000, 
        }, 
        presets: [ 
            { 
                id: 'mbfc-overview', 
                name: 'Marina Bay Financial Centre Aerial', 
                position: { x: 50, y: 300, z: 450 }, 
                target: { x: 0, y: 50, z: 0 }, 
                fov: 45, 
            }, { 
                id: 'orq-pedestrian', 
                name: 'One Raffles Quay Pedestrian Angle', 
                position: { x: -120, y: 20, z: 150 }, 
                target: { x: -80, y: 40, z: 0 }, 
                fov: 50, 
            }, 
        ], 
    }); 
}